const NoteService = {
  getAllNotes( knex ) {
    return knex
      .select( '*' )
      .from( 'notes' )
  },
  insertNote( knex, newNote ) {
    return knex
      .insert( { ...newNote } )
      .into( 'notes' )
      .returning( '*' )
      .then( ( rows ) => {
        return rows[0]
      } )
  },
  getNoteById( knex, id ) {
    return knex
      .select( '*' )
      .from( 'notes' )
      .where( 'id', id )
      .first()
  },
  deleteNote( knex, id ) {
    return knex( 'notes' )
      .where( { id } )
      .delete()
  },
  updateNote( knex, id, newNoteFields ) {
    return knex( 'notes' )
      .where( { id } )
      .update( { ...newNoteFields }, '*' )
  },
}
    
module.exports = NoteService
