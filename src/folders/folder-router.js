const express = require( 'express' )
const path = require( 'path' )
const FolderService = require( './folder-service' )

const folderRouter = express.Router()
const jsonParser = express.json()

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
    const { name : newFolder } = req.body

    FolderService.insertFolder(
      req.app.get( 'db' ),
      newFolder
    )
    res.folder = newFolder // save folder for next middlewear, and pass on to next
      .then( ( folder ) => {
        res
          .status( 201 )
          .location( path.posix.join( req.originalUrl, `/${folder.id}` ) )
          .json( folder )
      } )
      .catch( next )
  } )

folderRouter

  .route( 'folder/:folderId' )

  .all( ( req, res, next ) => {
    FolderService.getFolderById(
      req.app.get( 'db' ),
      req.params.folderId
    )
      .then( ( folder ) => {
        if ( !folder ) {
          return res.status( 404 ).json( {
            error : { message : 'Folder doesn\'t exist' }
          } )
        }
        res.folder = folder // save folder for next middlewear, and pass on to next
        next()
      } )
      .catch( next )
  } )

  .get( ( req, res, next ) => {
    res.json( res.folder )
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
          .status( 204 )
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
