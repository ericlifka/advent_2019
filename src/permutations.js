
const remove = (index, array) => array.filter( (_, i) => i !== index )

export const permutations = (elements) =>
  elements.length === 0 ? [ ] :
  elements.length === 1 ? [ elements ] :
  elements.map( ( cur, index, _
                , rest = remove(index, elements)
                , subPerms = permutations(rest)
                ) => subPerms.map( perm => [cur, ...perm] ))
          .flat()
