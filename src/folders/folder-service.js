const FolderService = {
  getAllFolders( knex ) {
    return knex
      .select( '*' )
      .from( 'folders' )
  },
  insertFolder( knex, newFolderName ) {
    return knex
      .insert( { name : newFolderName } )
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
      .where( { id } )
      .first()
  },
  getNotesForFolder( knex, folderid ) {
    const notes = knex
      .select( '*' )
      .from( 'notes' )
      .where( { folderid } )
    return notes
  },
  deleteFolder( knex, id ) {
    return knex( 'folders' )
      .where( { id } )
      .delete()
  },
  updateFolderName( knex, id, name ) {
    return knex( 'folders' )
      .where( { id } )
      .update( { name } )
      .returning( '*' )
      .then( ( rows ) => {
        return rows[0]
      } )
  },
}
  
module.exports = FolderService
