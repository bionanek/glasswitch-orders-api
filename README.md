# How to handle associantions with _Sequelize_ - standard 
--------------------------------------------------------------
`Update 17 Feb 15: 1. The new v2, uses 2x .belongsToMany() for N:M.`

There have been many problems in understanding all these associations.

Generally I think we are confused as to what are the tables created, and what methods are gained by associations.

The below text is something I wrote to standardise how I want my team to handle all these. As for the naming conventions, you may ignore it if you just let Sequelize default everything.

However it is recommended to explicitly name your conventions for many reasons.

### Brief:

* O:O, set up a `Parent.hasOne(Child)` AND `Child.belongsTo(Parent)`.
* O:M, set up `Parent.hasMany(Child)` AND `Child.belongsTo(Parent)`.
* N:M*, set up `Parent.belongsToMany(Child, {through: 'Parent_Child', foreignKey: 'Parent_rowId'})` and `Child.belongsToMany(Parent, {through: 'Parent_Child', foreignKey: 'Child_rowId'})`.

Methods gained by `hasOne()`, `hasMany()` and `belongsTo()/belongsToMany()`

To understand why we do the above associations we start off by knowing what are the methods we gain for each model.

### hasOne():

In setting a `Parent.hasOne(Child)`, methods available to parent DAO instance:

``` javascript
parent.getChild(),
parent.setChild(),
parent.addChild(),
parent.createChild(),
parent.removeChild(),
parent.hasChild()
```

### hasMany():

In setting a `Parent.hasMany(Child)`, methods available to parent DAO instance:

``` javascript
parent.getChildren(),
parent.setChildren(),
parent.addChild(),
parent.createChild(),
parent.removeChild(),
parent.hasChild(),
parent.hasChildren()
```

### belongsTo()/belongsToMany:

In setting a `Child.belongsTo(Parent)`, methods available to child DAO instance:

``` javascript
child.getParent(),
child.setParent(),
child.createParent()

//belongsToMany
child.getParents(),
child.setParents(),
child.createParents()
``` 

#### The syntax for setting up relationships. And our conventions

For **O:O**, and **O:M**:

``` javascript
Parent.hasOne(Child, {foreignKey: 'Parent_childID'});
Child.belongsTo(Parent, {foreignKey: 'Parent_childID'});
``` 

Note that we explicitly defined our foreignKeys to be Parent_childID. This is because we want this PascalCase_camelCase for TableName_keyName convention.

##### Many to Many relationship

For a **N:M** relationship, do this:

``` javascript
Parent.belongsToMany( Child, {
    as: [Relationship],
    through: [Parent_Child] //this can be string or a model,
    foreignKey: 'Parent_rowId'
});

Child.belongsToMany(Parent, {
    as: [Relationship2],
    through: [Parent_Child],
    foreignKey: 'Child_rowId'
});
``` 
**New in v2: Using "through" is now a must. As a standard, using the "through" parameter, we explicitly define all the crosstable names for consistency and less gotchas.**

The above will create the `Parent_Child`, with _RelationshipId_ and _Relationship2ID_.

Sequelize can create foreignKeys automagically, but I usually define my own.

##### Table and keys naming conventions

TableNames: **PascalCase**

keys: **camelCase**

foreignkeys: **TableNameInPascalCase_foreignKeyInCamelCase**
()
Example: **User_pictureId** Meaning: This key of **pictureId** came from the User table.