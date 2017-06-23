export const DELETE = 'DELETE';
export const EDIT_BOOK = 'EDIT_BOOK';
export const EDIT_OK = 'EDIT_OK';
export const ADD_BOOK= 'ADD_BOOK';
export const ADD_OK= 'ADD_OK';
export const ADD_CANCEL= 'ADD_CANCEL';




export function deleteBook (deleteKey){
  return {type:DELETE,deleteKey}
}
export function editBook (editKey){
  return {type:EDIT_BOOK,editKey}
}
export function editOk (theBook){
  return {type:EDIT_OK,theBook}
}
export function addBook (){
  return {type:ADD_BOOK}
}
export function addOk (newBook){

  return {type:ADD_OK,newBook}
}
export function addCancel (){
  return {type:ADD_CANCEL}
}
