<!-- 
This content is derived from the DMTF Cloud Infrastructure Management Interface (CIMI) Specification
DSP0263 Version 2.0.0, Copyright © 2012, 2013, 2016 Distributed Management Task Force, Inc. (DMTF)
Original specification: https://www.dmtf.org/standards/cimi
-->

## 5.5 Data types and their serialization

Unless specifically asked to not include certain attributes in the Resource representation, the absence of an optional attribute in the representation means that the attribute has no value (i.e., is undefined), meaning there is no notion of an optional attribute having an implied value. Note that a client cannot distinguish (from just looking at the returned representation) whether a particular attribute is not supported from one that does not exist. Likewise, an absent attribute from a Resource representation as the input to an update operation means that the Consumer is requesting that the Provider remove that attribute.

The following clauses describe the data types and values that are used within the model definition tables.

### 5.5.1 boolean  
A value as defined by xs:boolean per XML Schema – Part 2, with the exception that the only allowable values are either `"true"` or `"false."` The value is case sensitive.  
- **JSON type:** boolean  
- **XML type:** xs:boolean  

### 5.5.2 dateTime  
A value as defined by xs:dateTime per XML Schema – Part 2, which is consistent with DSP4014 and ISO 8601. The timestamp should preserve time zone information, i.e., include a local time component and an offset from UTC.  
Any constraints on the specific ranges allowed for any particular attribute are specified by that attribute's definition or at runtime by the Provider by way of the metadata discovery mechanisms defined by this specification.  
For example, Monday, May 25, 2012, at 1:30:15 PM EST is represented as:  
```text
2012-05-25T13:30:15-05:00
```  
- **JSON type:** string  
- **XML type:** xs:dateTime  

### 5.5.3 duration  
A value as defined by xs:duration per XML Schema – Part 2. Any constraints on the specific ranges allowed for any particular attribute shall be specified by that attribute's definition or at runtime by the Provider by way of the metadata discovery mechanisms defined by this specification.  
- **JSON type:** string  
- **XML type:** xs:duration  

### 5.5.4 integer  
A value as defined by xs:integer per XML Schema – Part 2. Any constraints on the specific ranges allowed for any particular attribute shall be specified by that attribute's definition or at runtime by the Provider by way of the metadata discovery mechanisms defined by this specification.  
- **JSON type:** number  
- **XML type:** xs:integer  

### 5.5.5 string  
A value as defined by xs:string per XML Schema – Part 2. Any constraints on this type for any particular attribute shall be specified by that attribute's definition or at runtime by the Provider by way of the metadata discovery mechanisms defined by this specification.  
If serializing an attribute of type string, the serialization shall omit this attribute in case of an empty string.  
- **JSON type:** string  
- **XML type:** xs:string  

### 5.5.6 ref  
A reference to another Resource. References allow Consumers to navigate to Resources. By starting at the Cloud Entry Point and following the references that appear in retrieved Resources, Consumers can recursively discover and navigate all other Resources.  
As a general rule, if an attribute is of type `ref`, its value shall be held by an attribute named `href` (both in JSON and XML).  

**JSON serialization:**  
In JSON the `href` property appears as type string. If an attribute is of type `ref`, the name of this attribute appears as a key, with the `href` property as a nested value. For example:  
```json
"myvolume": { "href": "http://example.com/volume/123" }
```

**XML serialization:**  
In XML the `href` attribute appears as type xs:anyURI. If an attribute is of type `ref`, the name of this attribute appears as the XML element, with `href` as an attribute. For example:  
```xml
<myvolume href="http://example.com/volume/123"/>
```

References in both JSON and XML have an extensibility point that allows additional information (such as the target Resource to be included “by value”) if supported. For brevity, the examples above exclude those extensibility points.

### 5.5.7 map  
A list of key-value pairs. The same `key` shall not be used more than once within an attribute. The `key` is case sensitive.  
If serializing an attribute of type map, the serialization shall omit this attribute in case of an empty map.

### 5.5.8 structure  
Attributes of this type are complex attributes made up of a set of nested attributes. For each attribute of this type, there is an additional table defining those nested attributes.  
A nested structure can be considered a complex type definition. Structures may be named or unnamed.

**Example (named structure “summary”):**  
| Attribute | Type   | Description                   |
| --------- | ------ | ----------------------------- |
| low       | number | Number of “low” occurrences   |
| medium    | number | Number of “medium” occurrences|
| high      | number | Number of “high” occurrences  |
| critical  | number | Number of “critical” occurrences|

**JSON serialization:**  
The name of the structure does not appear in JSON. For example:  
```json
"systemIncidents": {
  "low": 10,
  "medium": 5,
  "high": 2,
  "critical": 1
}
```

**XML serialization:**  
The name of the structure does not appear in XML either. The sub-attributes become XML attributes of an element:  
```xml
<systemIncidents low="10" medium="5" high="2" critical="1"/>
```

> **Note:** A large number of sub-attributes in a structure may alternatively be represented as XML child elements for readability. However, the same structure must be serialized consistently across Resources.

### 5.5.9 byte[]  
An arbitrary set of bytes representing a block of binary data. Any constraints on this type for a particular attribute shall be specified by that attribute's definition or at runtime by the Provider by way of metadata discovery mechanisms.  
- **JSON type:** string  
- **XML type:** xs:hexBinary  

## 5.5.10 URI

The format and syntax of the attributes of type “URI” is defined by RFC3986.  
Unless otherwise noted, this specification does not mandate whether Providers use relative or absolute URI in the HTTP response bodies.  
If URIs are specified as relative URIs, they shall be relative to the `baseURI`.  
The algorithm used for converting a relative URI to an absolute URI shall be as described in section 5.2 of RFC3986. Table 3 illustrates how relative URIs are resolved against base URIs:

**Table 3 – Converting a relative URI to an absolute URI**

| Base URI                        | Relative URI | Absolute URI                             |
|---------------------------------|--------------|------------------------------------------|
| `http://example.com/`           | `p1/file`    | `http://example.com/p1/file`             |
| `http://example.com/c1/`        | `p1/file`    | `http://example.com/c1/p1/file`          |
| `http://example.com/c1/c2/`     | `p1/file`    | `http://example.com/c1/c2/p1/file`       |

If relative URIs are used, the `baseURI` shall end with a trailing slash and relative URIs shall not begin with a leading slash. This format is consistent with most URI resolve utilities and produces the same results as a simple string concatenation algorithm.

If serialized in JSON, these values shall be of JSON type: **string**  
If serialized in XML, these values shall be of XML Schema type: **xs:anyURI**

---

## 5.5.11 Array

An array represents an ordered list of items of the same type. An array shall always appear as an attribute of a Resource, and is only accessible as such (it is not a separately addressable Resource). If a Resource is deleted, the items in its arrays shall also be deleted. However, in case these items were just references to other Resources, these referred Resources are not affected. (See the semantics of references in 5.7.)

Attributes that are arrays are defined by using the notation `itemType[]`, where `itemType` is the type name for each item of the array. If the type is a structure, not a simple data type, it is recommended as a convention in the model that the name of an array be the plural of a name that characterizes each item. For example, an array of volume items or of references to these may be named “volumes.”

**JSON serialization:**  
Within this specification, arrays in JSON are serialized with a wrapper property. The wrapper name shall be the same as the attribute name for the array. For example, a “things” attribute of type `thing[]` is serialized as:

```json
"things": [
  { ... },
  ...
]
```

If the items in the array are structures, the structure name shall not be present in the JSON serialization. In the case of an array of references, i.e., where the `ref` type applies to each element of the array, each element shall simply be serialized as an `href` property within a JSON array. For example, an array “things” of type `ref[]` is serialized as:

```json
"things": [
  { "href": "string" },
  ...
]
```

> **NOTE:** If serializing arrays, conformant implementations shall not include empty arrays (i.e., arrays that contain no child properties) in the JSON serialization. Notice that the child of the “things” property is defined with a “+”, meaning at least one child is required. This requirement ensures that the JSON serialization is minimized and only includes the wrapping “things” element if, and only if, there is at least one “thing” in the array.

**XML serialization:**  
The XML serialization of arrays requires each item of the array to be represented as an element. These elements shall be consecutive and contiguous in the serialization and the name of each element (tag name) shall be the name of the element type (the name that appears before `[]` in the array type). As in JSON, the serialized array has a wrapper element of the same name as the array attribute name. For example, a “things” attribute shall be serialized as a list of items named “thing”:

```xml
<things>
  <thing>...</thing>
  ...
</things>
```

In the case of an array of references, i.e., where the `ref` type applies to each element of the array, the array is serialized as a list of XML elements without a wrapper. Each element is named per an array “item name” specified in the attribute’s definition. For example, an array “things” of type `ref[]` where the array “item name” is “thing” is serialized as:

```xml
<thing href="xs:anyURI"/>
```

## 5.5.13 "Any" type
Some attributes are polymorphic and can hold various data types, the list of which is indicated in their description. In such cases, the type of the attribute shall be indicated as "any" in the model representation.

## 5.5.14 valueScope 
The valueScope type is a specialized map. Its goal is to define possible values for a list of attributes of a Resource. The possible values for an attribute are called the “value scope” of the attribute, and a combination of attribute value scopes (in form of a map) in a Resource or in the ResourceMetadata is called the value scope of the Resource.  

Each item in a valueScope is a key-value pair where:  
- The key is the name of an attribute of a Resource – or “scoped attribute” – for which a set of possible values is defined.  
- The value is a structure that defines the “scope”, i.e., a range, an enumeration or a single assigned value for the scoped attribute.

**The scope structure:**  
A “scope” structure – or the value part of a key-value item in a valueScope – can take one of following forms:

1) An assigned single value, along with its (optional) units, e.g.:
```json
"cpu": { "value": 2000, "units": "megahertz" }
```

2) A range of values, with optional units, default, and increment:  
```json
"memory": { "minimum": 4000, "maximum": 10000, "units": "kibibytes", "default": 4000, "increment": 2000 }
```

3) An enumeration of possible values, with optional units and default:
```json
"cpuArch": { "values": ["68000", "Alpha", "ARM", "PA_RISC"], "default": "PA_RISC" }
```

4) Simply a required units, or applying to items in a collection:
```json
"machines": { "item": { "remoteLocation": { "values": ["URI1", "URI2", "URI3"], "default": "URI1" } } }
```

If a valueScope is associated with a Resource type, it shall appear as an attribute named `vscope`, of type `valueScope[]`.

**Example of valueScope for the MachineConfiguration Resource:**
```json
"vscope": [
  {
    "cpu": { "value": 1 },
    "memory": { "minimum": 4, "maximum": 32, "units": "GbB", "default": 4, "increment": 2 },
    "cpuArch": { "values": ["68000", "Alpha", "ARM", "PA_RISC", "i5"], "default": "i5" }
  }
]
```

**Semantics of valueScope array:**  
The value scope of a Resource shall be represented by an array of valueScope instances, even if there is only one. This allows for expressing dependencies between attributes. The scoped attributes must satisfy at least one valueScope instance.

**Example with multiple scopes:**
```json
"vscope": [
  {
    "cpuSpeed": { "minimum": 2, "maximum": 4, "units": "GHz", "default": 2.5 },
    "memory": { "minimum": 2000000, "maximum": 10000000, "units": "KbB", "increment": 2000000 },
    "cpuArch": { "value": "i5" }
  },
  {
    "memory": { "minimum": 4000000, "maximum": 32000000, "units": "KbB" },
    "cpuArch": { "values": ["68000", "Alpha", "PA_RISC"] }
  }
]
```

This means the Provider supports MachineConfigurations with either:
- cpuArch of "i5" and memory/cpuSpeed in the first range, **or**
- cpuArch of one of the list and memory in the second range.

**Pseudo-schemas:**

**JSON serialization:**
```json
("value": any, "units": string ?) |
("values": [ any, + ], "units": string ?, "default": string ?) |
("minimum": number ?, "maximum": number ?, "units": string ?, "default": number ?, "increment": number ?)
```

**XML serialization:**
```xml
(<value> xs:any </value> <units> xs:string </units> ?) |
(<value> xs:any </value> + <units> xs:string </units> ? <default> xs:any </default> ?) |
(<minimum> xs:integer </minimum> ? <maximum> xs:integer </maximum> ? <units> xs:string </units> ? <default> xs:integer </default> ? <increment> xs:integer </increment> ?)
```

A Provider who supports value scopes shall set the ValueScopes capability (ResourceMetadata) to “true”.

## 5.5.15 Empty attribute values 
Attributes of the following types are omitted if they have an empty value: `string`, `map`, `array`, and `Collection`. Apart from being “Provider optional” or “Consumer optional”, an empty value is the third reason that the serialization schema contains an `?` or an `*` for an attribute. Other attribute types do not have empty values and shall not be omitted for this reason.
