const express = require( 'express' )
const path = require( 'path' )
const FolderService = require( './folder-service' )
const logger = require( '../logger' )

const folderRouter = express.Router()
const jsonParser = express.json()

// pull each piece of logic out of each route, all after .get, and put that all into a route file with a function for each route.
folderRouter

  .route( '/folder' )

  .get( ( req, res, next ) => {
    const knexInstance = req.app.get( 'db' )
    FolderService.getAllFolders( knexInstance )
      .then( ( folders ) => {
        res.json( folders )
      } )
      .catch( next )
  } )

  .post( jsonParser, ( req, res, next ) => {
    const { name : newFolderName } = req.body
    // build a validator / sanitizer middlewear for this.
    FolderService.insertFolder(
      req.app.get( 'db' ),
      newFolderName
    )
      .then( ( folder ) => {
        res
          .status( 201 )
          .location( path.posix.join( req.originalUrl, `/${folder.id}` ) )
          .json( folder )
      } )
      .catch( next )
  } )

folderRouter

  .route( '/folder/:folderId' )

  .all( ( req, res, next ) => {
    FolderService.getFolderById(
      req.app.get( 'db' ),
      req.params.folderId
    )
      .then( ( folder ) => {
        if ( !folder ) {
          logger.error( `Folder with id ${req.params.folderId} not found` )
          return res.status( 404 ).json( {
            error : { message : 'Folder not found.' }
          } )
        }
        res.folder = folder // save folder for next middlewear, and pass on to next
        next()
      } )
      .catch( next )
  } )

  .get( ( req, res, next ) => {
    // res.json( res.folder )

    FolderService.getNotesForFolder(
      req.app.get( 'db' ), 
      res.folder.id
    )
      .then( ( notes ) => {
        if ( !notes ) {
          return res.status( 404 ).json( {
            error : { message : 'Cannot find any notes for that folder' }
          } )
        }
        const folder = res.folder
        res.json( { folder, notes } )
        next()
      } )
  } )
  
  .patch( jsonParser, ( req, res, next ) => {
    const { name : newFolderName } = req.body
   
    FolderService.updateFolderName(
      req.app.get( 'db' ),
      req.params.folderId,
      newFolderName
    )
      .then( ( updatedFolder ) => {
        res
          .status( 200 )
          .json( updatedFolder )

      } )
      .catch( next )
  } )
    
  .delete( ( req, res, next ) => {
    FolderService.deleteFolder(
      req.app.get( 'db' ),
      req.params.folderId
    )
      .then( ( numRowsAffected ) => {
        res
          .status( 204 )
          .end()
      } )
      .catch( next )
  } )
    
module.exports = folderRouter
