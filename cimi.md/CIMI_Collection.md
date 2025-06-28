<!-- 
This content is derived from the DMTF Cloud Infrastructure Management Interface (CIMI) Specification
DSP0263 Version 2.0.0, Copyright © 2012, 2013, 2016 Distributed Management Task Force, Inc. (DMTF)
Original specification: https://www.dmtf.org/standards/cimi
-->

# 5.5.12 Collection
A Collection is a group of Resources of the same type. In contrast with arrays, Collections are themselves
Resources that have their own URI and can be independently accessed. Collections also allow for an
optimized and convenient interaction pattern by providing a specialized set of operations that avoid
replacing a large number of items when updating the set, as with arrays.
This specification uses Collections if the set of grouped items is modified often and potentially by multiple
Consumers. Conversely, arrays are used if it is expected that the list of items is not modified often or can
be easily modified by substitution of the entire list, and thus the overhead of managing these items as
separate Resources might be unjustified and burdensome.
An item in a Collection, i.e., a Collection item, is an embedded structure that contains a reference to a
Resource and optionally additional attributes (see “accessory” attributes, defined later). For convenience,
the Resource referred to by a Collection item is called here a Resource item of the Collection.
A Resource may be referenced by more than one Collection. If such a Resource is deleted, every
Collection that references this Resource shall remove the corresponding item. While different Collections
contain entries of different Resource types, all Collections follow the pattern described below:

- A Collection shall contain an id attribute that acts as a "self-pointer." Retrieving the data at this
reference shall return the Collection. In the XML representation, each Collection shall be wrapped
by a <Collection> element.

- A Collection shall contain a count attribute that indicates the number of Resources in the
Collection at the time the Collection was queried.

- Adding new Resources to the Collection shall be done either via the "add" operation defined
within the Collection (when the Resource is also created) or via the “insert” operation (when the
Resource already exists).

Deleting an item from the Collection shall be done either via a "delete" operation on the Resource item
itself (if the Resource has to be discarded) or via the “remove” Collection operation (if the Resource must
still exist outside the Collection).Collections that are attributes of other Resources are represented with
attribute type "collection[itemType]." The Resource type of the Collection items are specified inside
the brackets; for example an attribute that is a Collection of Machines is expressed as
"collection[Machine]." Attributes of such types are serialized as a reference to a Collection
Resource instead of holding the Collection itself as value. For brevity, while these attributes are
"references" the word "ref" or "reference" does not appear in the model definition tables - instead the type
of such an attribute is making abstraction of the reference and more explicitly shows as
"collection[itemType]".

In the serializations below, the Collection items are represented by items in the
ResourceSpecificGroupingName JSON array, and by ResourceSpecificElementName elements XML representation.
in the
### Serialization:
The serialization of Collections shall adhere to the following pattern:
**JSON serialization:**
{ "resourceURI": string,
    "id": string,
    “updated": string, ?
    "parent": string, ?
    "count": number,
    "resourceSpecificGroupingName": [
        {
            "resourceURI": string,
            "id": string,
            "name": string, ?
            "description": string, ?
            "created": string, ?
            "updated": string, ?
            "parent": string, ?
            "properties": {
                string: string, +
            }, ?
        ... resource specific data ...
        "operations": [
            { "rel": "edit", "href": string }, ?
            { "rel": "delete", "href": string } ?
        ] ?
        ...
        } +
    ], ?
    "operations": [
        { "rel": "add", "href": string } ?
        { "rel": "insert", "href": string } ?
        { "rel": "remove", "href": string } ?
    ]

...
}
**XML serialization:**
<Collection resourceURI="xs:anyURI" xmlns="http://schemas.dmtf.org/cimi/2">
<id> xs:anyURI </id>
<updated> xs:dateTime </updated> ?
<parent> xs:anyURI </parent> ?
<count> xs:integer </count>
<resourceSpecificGroupingName>
<ResourceSpecificElementName>
<id> xs:anyURI </id>
<name> xs:string </name> ?
<description> xs:string </description> ?
<created> xs:dateTime </created> ?
<updated> xs:dateTime </updated> ?
<parent> xs:anyURI </parent> ?
<property key="xs:string"> xs:string </property> *
... resource specific data ...
<operations>
<operation rel="edit" href="xs:anyURI"/> ?
<operation rel="delete" href="xs:anyURI"/> ?
</operations>
<xs:any>*
</ResourceSpecificElementName> *
</resourceSpecificGroupingName>
<operations>
<operation rel="add" href="xs:anyURI"/> ?
<operation rel="insert" href="xs:anyURI"/> ?
<operation rel="remove" href="xs:anyURI"/> ?
</operations>
<xs:any>*
</Collection>
Where the resourceURI attributes shall contain the Collection or Resource specific URIs for that type of
DSP0263 Cloud Infrastructure Management Interface (CIMI) Model and RESTful HTTP-based Protocol
Collection, and resourceSpecificGroupingName and ResourceSpecificElementName shall be
replaced with the name of the Collection-specific Resource name, e.g., machines in JSON or Machine
in XML.
The above serialization shows that each entry in a Collection may contain “resource-specific data” beside
the reference to the Resource item and the common attributes. This placeholder represents two kinds of
data:
a) Optionally some accessory attributes that represent accessory information for the use of this
reference in the context of the Resource owning that Collection (the accessory attributes) – e.g.,
the “initial location” of a referenced Volume, in a Collection of Volumes associated with a
Machine. Accessory attributes – if any - are part of the definition of each specific Collection.
b) All or a subset of the attributes of the corresponding Resource items. How much of the
Resource item is expanded in the serialization of the Collection is controlled by expansion
mechanisms described later.
If accessory attributes exist for items in a Collection, the “resourceSpecificGroupingName” or
“ResourceSpecificElementName” is not just identifying the Resource type of Collection items, but is a
unique name specific to this combination of accessory attributes and Resource type – e.g., for Volumes
with initial location, it may be “locatedVolume”. Also the resourceURI of the Collection is unique to this
combination. Because of this accessory attribute, the Collection of Volumes is said to be “enhanced”, as
opposed to “basic” for a Collection without accessory attribute.
The serialization of Collections follows these additional rules:
- A Provider may limit the number of Resources returned in the Collection. The Consumer can
determine this has occurred by comparing the number of returned Resources with the value of
the "Count" attribute and any Collection subsetting query parameters it specified. In this case,
the Consumer is advised to specify filter query parameters (see 4.1.6.1) to reduce the number
of entries returned, or retrieve them in batches by issuing multiple requests with Collection
subsetting query parameters (see 4.1.6.2)
- As with all Resources in the CIMI model, each Resource in the Collection shall have an id
attribute that acts as a "self-pointer." Retrieving the data at this reference shall return just that
one Resource and not any parent Resource, such as the Collection or array attribute.
- The serialization of a Collection may be controlled (see 4.1.6.4 $expand query parameter) to
show more or less of each Resource item. By default, each entry in the Collection will show just
a reference (URL) to the Resource item, along with the “common” attributes of the Resource
item. Alternatively, the Resource item may be expanded partially or fully when querying the
Collection.
- As with all arrays, if there are no Resources in the Collection, the serialization of the list shall be
omitted.

## 5.5.12.1 Adding an item to a Collection
Invoking the "add" operation of a Collection shall create a new Resource and add it to the Collection. The
contents of the request body shall be either a representation of the new Resource being added to the
Collection, or a representation of the Template associated with the new Resource being created and
resource specific data attributes.
If creating a new Resource, the "add" operation shall contain:
- The "common attributes" as defined by clause 5.7.1
- The Resource specific data needed to create it. This data shall either be a reference to the
Resource-specific Template Resource or be the Resource-specific Template Resource itself
inlined.
- Accessory attributes–if any–that represent accessory information for the use of the reference in
the context of the Resource owning that Collection (the associative attributes)
- In the XML case, a wrapper element (named after the pattern <ResourceNameCreate>)

For example, to create a new Machine (which requires the use of a Template) and add it to the
MachineCollection, the "add" operation of the MachineCollection shall be serialized as follows:
**JSON serialization:**
{ "resourceURI": "http://schemas.dmtf.org/cimi/2/MachineCreate", ?
"name": string, ?
"description": string, ?
"properties": { string: string, + }, ?
"machineTemplate": { "href": string ?}
...
}
**XML serialization:**
<MachineCreate xmlns="http://schemas.dmtf.org/cimi/2">
<name> xs:string </name> ?
<description> xs:string </description> ?
<properties>
<property key="xs:string"> xs:string </property> *
</properties>
<machineTemplate href="xs:anyURI"? />
<xs:any>*
</MachineCreate>

The MachineCollection has a new Machine:
**JSON serialization:**
{ "resourceURI": "http://schemas.dmtf.org/cimi/2/Machine",
"id": string,
"name": string,
...
}
**XML serialization:**
<Machine xmlns="http://schemas.dmtf.org/cimi/2">
<id> xs:anyURI </id>
<name> xs:string </name>
...
</Machine>
The processing of the "add" operation shall adhere to the semantics defined in clause 4.2.1.1.
Regardless of whether a Template is used, the "add" operation shall create the new Resource and add it
to the Collection and a reference (URI) to the new entry shall be returned in the response message in the
HTTP Location header.

## 5.5.12.2 Inserting an item in a Collection
Invoking the "insert" operation of a Collection shall add, to the Collection, a new reference to an existing
Resource. The contents of the request body shall specify the URL of the existing Resource being added
and the accessory attributes in case of an “enhanced” collection.
To add an existing Volume to the volumes Collection of a Machine, the request body of the "insert"
operation shall be serialized as follows:
**JSON serialization:**
{ "resourceURI": "http://schemas.dmtf.org/cimi/2/Action",
"action": “http://schemas.dmtf.org/cimi/2/action/insert”,
"initialLocation": string,
"volume": { "href": string }
}
**XML serialization:**
<Action xmlns="http://schemas.dmtf.org/cimi/2">
<action>http://schemas.dmtf.org/cimi/2/action/insert</action>
<initialLocation> xs:string </initialLocation>
<volume href="xs:string"/>
</Action>
Note that “initialLocation” is an accessory attribute to each reference of Volume. Because of this
addition, the type of the collection items is distinguished from Volume, and called here locatedVolume.
The definition of the volumes Collection of the Machine Resource describes the accessory attribute(s)
for this Collection.

## 5.5.12.3 Removing an item from a Collection
Invoking the "remove" operation of a Collection shall delete the specified item in the Collection, i.e., the
Resource reference along with accessory attributes if any, without destroying the referenced Resource
item itself. The contents of the request body shall be the URL of the Resource item being removed.

To remove a Volume from the volumes Collection of a Machine, the request body of the "remove"
operation shall be serialized as follows:
**JSON serialization:**
{ "resourceURI": "http://schemas.dmtf.org/cimi/2/Action",
"action": “http://schemas.dmtf.org/cimi/2/action/remove”,
"volume": { "href": string }
}
**XML serialization:**
<Action xmlns="http://schemas.dmtf.org/cimi/2">
<action>http://schemas.dmtf.org/cimi/2/action/remove</action>
<volume href="xs:string"/>
</Action>
Removing the referenced Resource (here a Volume) deletes the related entry from the Collection. This
deletes the reference but not the Resource itself.

## 5.5.12.4 Deleting an item in a Collection
Deleting the Resource referenced by a Collection item via a DELETE operation on the Resource itself (in
the previous example, a Volume) also deletes the related entry from the Collections that reference this
Resource – i.e., it has the effect of a “remove” on the Collection, in addition to deleting the referenced
Resource.