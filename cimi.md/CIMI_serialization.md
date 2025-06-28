<!-- 
This content is derived from the DMTF Cloud Infrastructure Management Interface (CIMI) Specification
DSP0263 Version 2.0.0, Copyright © 2012, 2013, 2016 Distributed Management Task Force, Inc. (DMTF)
Original specification: https://www.dmtf.org/standards/cimi
-->

## 5.4 Serialization of Resources

The serialization of Resource instances in the model follow these conventions. Consider the serialization of a Resource named “MyResource”:

**JSON serialization:**  
The Resource is serialized as an object wrapping all its attributes, but without a wrapper name. The Resource includes a `resourceURI` with a URI for the type of Resource being serialized. For example:  
```json
{
  "resourceURI": "http://example.com/MyResource",
  "attribute": "value"
}
```

**XML serialization:**  
The Resource is serialized as an element with name equal to the Resource name; for example:  
```xml
<MyResource xmlns="http://example.com">
  <attribute>value</attribute>
</MyResource>
```

The serialization of attributes in a Resource follows the rules for the serialization of each data type, listed in clause 5.5.  
