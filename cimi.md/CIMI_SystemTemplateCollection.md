## 5.13.5 SystemTemplateCollection Resource

A **SystemTemplateCollection Resource** represents the Collection of SystemTemplate Resources within a Provider and follows the Collection pattern defined in clause 5.5.12.

---

### 5.13.5.1 Operations

The following custom operations are defined:

**import**  
`/link@rel: http://schemas.dmtf.org/cimi/2/action/import`

This operation shall import a SystemTemplate. Not only is a SystemTemplate created, but **MachineTemplates**, **VolumeTemplates**, and **NetworkTemplates**, and possibly recursive SystemTemplates and their components may also be created, corresponding to imported descriptor entries.  
More detail about this process is in ANNEX A.

- **Input parameters:**  
  `"source"` — type: `URI` — mandatory.  
  Indicates the location from which the imported data is retrieved. Based on the specific protocol specified within the URI, the Consumer might need to provide additional information (such as credentials) in the `"properties"` field.

- **Output parameters:** None.

---

**HTTP protocol**

To import a SystemTemplate, a `POST` is sent to the `http://schemas.dmtf.org/cimi/2/action/import` URI of the SystemTemplateCollection where the HTTP request body shall be as described below.

---

**JSON media type:** `application/json`  
**JSON serialization:**

```json
{
  "resourceURI": "http://schemas.dmtf.org/cimi/2/Action",
  "action": "http://schemas.dmtf.org/cimi/2/action/import",
  "source": "string",
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
  <action>http://schemas.dmtf.org/cimi/2/action/import</action>
  <source>xs:anyURI</source>
  <properties>
    <property key="xs:string">xs:string</property>
  </properties>
  <xs:any>*
</Action>
```

---

## 5.13.6 Service-specific Descriptor Attributes

This clause defines additional attributes specific to each service type that need to be added to a **serviceDescriptor** for that service type in the **SystemTemplate**.

---

### 5.13.6.1 Parameters for the HighReliability Service Type

**Service type:** `http://schemas.dmtf.org/cimi/2/SystemService/highreliability`

---

**Table 15 – Additional Parameters for HighReliability Service**

| Service Type | Attribute | Type | Description |
|--------------|-----------|------|-------------|
| highreliability | machines | String[] | Symbolic references to the Machine components in the System that are subject to the service. Uses the symbolic component reference notation (“#<name>”). |
| highreliability | network | string | Symbolic reference to the Network Resource in the System that enables this service. The Network shall provide the necessary connections between Machines to support this Service. |
| highreliability | heartbeat | Integer | Heartbeat frequency, in milliseconds, between one heartbeat and the next. |
| highreliability | replicationType | String | The kind of disk replication data (does not refer to the Volume Resource). Allowable values: `synchronous`, `asynchronous`, `none`, `onlyAtClusterCreation`. |
| highreliability | RPO | Integer | Recovery Point Objective (duration in minutes) in case of asynchronous replica of the disks. |
