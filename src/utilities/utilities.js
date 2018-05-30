/*
    FUNCTIONS FOR CONVERTING FLAT LOOKUP OBJECT
    INTO COMPOSITE OBJECT TREE
*/



/*
    do not rely on this
*/

const deepClone = dataObj =>
    JSON.parse(JSON.stringify(dataObj)) ;


/*
    take flat data object and shallow clone
*/

const shallowClone = dataObj =>
   Object
       .entries( dataObj )
       .reduce ( (acc, [id, obj] ) => {
               acc[id]= Object.assign({}, obj) ;
               return acc }, {} ) ;

/*
   Rearange into tree structure
   by assinging children {} to parent {} via .children []
*/

const link = ( nodeA, nodeB ) => {
   const   { parent }= nodeA , { id }= nodeB ;
           // if NodeA's parent property == id of NodeB
           if ( parent===id ) {
               // add to children array and return true
               ( nodeB.children || ( nodeB.children= []))
                   .push(nodeA) ;
               return true ;   }
           // if NodeB !== .parent check for children
           else if ( nodeB.children ) {
               for( let childNode of nodeB.children)
                   if ( link(nodeA, childNode) ) return true ;
           } else {
               // if NodeA and NodeB are not directly linked
               return false
           }   }

/*

    CONVERT 'FLAT' DATA OBJECT TO TREE

    in psuedocode the normalised object:
        {   'a':{
                parent:'a',
                id:'a',
                // properties } ,
            'b':{
                parent:'a',
                id:'b',
                // properties } ,
            'c':{
                parent:'b',
                id:'c',
                // properties } }

in psuedocode turns to :
        a.children = [ b.children = [ c ] ]
*/

/*
    Apply shallow clone and run link() on data entries
*/

const extract = dataObj => {
   const tree = shallowClone(dataObj) ;
   // loop over original dataObj but apply changes to shallowCloned tree
   // every root object/node stored on dataObj is tested and tree obj manipulation does not affect looping
   Object.keys(dataObj).forEach(id => {
       let node= tree[id] ;
       // loop over parentNode(candidates)
       for (let [ , parentNode] of Object.entries(tree) )
           // if not the same node
           // && link recursive function returns true (found link)
           // delete tree[id] from root because it has been stored as child somewhere
           if (node !== parentNode && link(node, parentNode))
               delete tree[id]
       })
   return tree }



export const generateTree = (dataObj) => extract(dataObj) ;

