
const { API_KEY } = require( './config' )
const logger = require( './logger' )

function tokenAuth( req, res, next ) {
  const clientAPIToken = req.get( 'Authorization' )
  if ( !clientAPIToken || clientAPIToken.split( ' ' )[1] !== API_KEY ) {
    logger.error( `Unauthorized request to path: ${req.path}. API TOKEN: ${API_KEY} and AUTH TOKEN: ${clientAPIToken}` )
    return res.status( 401 ).json( { error : 'Unauthorized request' } )
  }
  next()
}

module.exports = tokenAuth
