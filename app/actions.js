export const DELETE = 'DELETE';




export function deleteBook (deleteKey){
  return {type:DELETE,deleteKey}
}
