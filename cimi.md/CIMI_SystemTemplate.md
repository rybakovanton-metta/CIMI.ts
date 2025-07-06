## 5.13.4 SystemTemplate Resource

The **SystemTemplate Resource** contains the set of individual descriptors needed to create or associate the components of a System. The Provider interprets the component descriptors as creation (or association) operations to be executed in an order compatible with the dependencies expressed between these components.

A SystemTemplate may include symbolic component references in the descriptors to express links between components of the resulting System.  
Example: `<volume href="#newVolume"/>` references a Volume named `newVolume`. The symbolic name `#newVolume` is replaced by the actual Resource URL in the instantiated System.

---

## Table 14 – SystemTemplate Attributes

**Name:** SystemTemplate  
**Type URI:** http://schemas.dmtf.org/cimi/2/SystemTemplate

| Attribute | Type | Description |
|-----------|------|--------------|
| componentDescriptors | componentDescriptor[] | The list of component descriptors describing the components of a System instance realized from this SystemTemplate. For each descriptor, the corresponding component is either created (child component) or associated if it already exists.<br><br>**Child component:** Refers to a Template (by reference or by value) and may include metadata.<br>**Associated component:** Refers directly to the existing Resource. |
| name | string | The value of the `"name"` attribute associated with a System component created from this descriptor. Not to be confused with the name in the Template itself. |
| description | string | The `"description"` associated with a System component created from this descriptor. |
| properties | map | Key-value pairs for the System component created from this descriptor. |
| type | URI | The `TypeURI` of the component, e.g., `http://schemas.dmtf.org/cimi/2/Machine` |
| <component Resource> | any | Depends on the type of Resource. It can be:<br>- An inline Template (with references)<br>- A reference to an external Template<br>- A reference to an existing Resource to associate |
| quantity | integer | Number of component instances to create. Default is `1`. If `>1`, names are suffixed numerically, e.g., `mymachine1`, `mymachine2`, etc. |
| serviceDescriptors | serviceDescriptor[] | The list of service descriptors for services to be supported by a System instance realized from this SystemTemplate. |
| meterTemplates | MeterTemplates[] | References to MeterTemplates for creating and connecting new Meters to the new System. |
| eventLogTemplate | ref | Reference to an EventLogTemplate for creating and connecting a new EventLog to the new System. |
| importImage | URI | If the Template results from an import (e.g., OVF package), this references the import source. |
| genResourceMetadata | ref | Reference to a ResourceMetadata to be associated with every System generated from this Template. |

---

**Name:** componentDescriptor

| Data Type | Description |
|-----------|--------------|
| name | string | The name value assigned to a System component created from this descriptor. |
| description | string | The description for the component. |
| properties | map | Key-value pairs associated with the component. |
| type | URI | The type URI of the component. |
| <component Resource> | any | Inline Template, Template reference, or existing Resource reference. |
| quantity | integer | Number of instances to create. |

---

**Name:** serviceDescriptor

| Data Type | Description |
|-----------|--------------|
| name | string | Name for the SystemService instance. |
| description | string | Description for the SystemService instance. |
| properties | map | Key-value pairs for the SystemService instance. |
| serviceType | URI | The type of SystemService, e.g., `http://schemas.dmtf.org/cimi/2/SystemService/disasterrecovery` |
| parameters | map | Additional service-specific attributes. |

---

## 5.13.4.1 Operations

This Resource supports **Read**, **Update**, and **Delete** operations. **Create** is supported through the SystemTemplateCollection Resource.

**Custom operation:**  
**export**  
`/link@rel: http://schemas.dmtf.org/cimi/2/action/export`  
This operation exports a SystemTemplate along with all its component Resources and used Resources listed in its top-level Collections.

If an export package exists at that URI, it is updated; otherwise a new export package is created with a Media Type specified by `"format"` (default: `"application/ovf"`).

- **Input parameters:**
  1) `"format"` — type: `string` — optional
  2) `"destination"` — type: `URI` — optional

- **Output parameters:** None

**HTTP protocol:**  
POST to `http://schemas.dmtf.org/cimi/2/action/export` with the body as follows:

---

**JSON media type:** `application/json`  
**JSON serialization:**
```json
{
  "resourceURI": "http://schemas.dmtf.org/cimi/2/Action",
  "action": "http://schemas.dmtf.org/cimi/2/action/export",
  "format": "string",
  "destination": "string",
  "properties": {
    "string": "string"
  }
}
```

---

**XML media type:** `application/xml`  
**XML serialization:**
```xml
<Action xmlns="http://schemas.dmtf.org/cimi/2">
  <action>http://schemas.dmtf.org/cimi/2/action/export</action>
  <format>xs:string</format>
  <destination>xs:anyURI</destination>
  <properties>
    <property key="xs:string">xs:string</property>
  </properties>
  <xs:any>*
</Action>
```
