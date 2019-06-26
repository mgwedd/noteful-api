const FolderService = {
  getAllFolders( knex ) {
    return knex
      .select( '*' )
      .from( 'folders' )
  },
  insertFolder( knex, newFolder ) {
    return knex
      .insert( newFolder )
      .into( 'folders' )
      .returning( '*' )
      .then( ( rows ) => {
        return rows[0]
      } )
  },
  getFolderById( knex, id ) {
    return knex
      .select( '*' )
      .from( 'folders' )
      .where( 'id', id )
      .first()
  },
  deleteFolder( knex, id ) {
    return knex( 'folders' )
      .where( { id } )
      .delete()
  },
  updateFolderName( knex, id, newFolderName ) {
    return knex( 'folders' )
      .where( { id } )
      .update( newFolderName )
      .returning( '*' )
  },
}
  
module.exports = FolderService
