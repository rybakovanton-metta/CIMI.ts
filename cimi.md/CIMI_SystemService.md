## 5.13.3 SystemService Resource

A **SystemService Resource** represents some management service for all or a subset of the Resources in a System. A SystemService Resource can define diverse types of management services and holds:  
a) **Topology information** about the service: a list of the Resources concerned by this management service, e.g., lists of Machines and Volumes subject to disaster recovery policy.  
b) **Service-specific parameters:** configuration data for the service itself.

System components may be listed under more than one SystemService Resource. For example, a Machine may be under a recovery service while also participating in an autoscaling service.

**Some examples of common services are:**  
- HighReliability service  
- DisasterRecovery service  
- Backup service  
- Autoscaling service

---

## Table 10 – SystemService Attributes

**Name:** SystemService  
**Type URI:** http://schemas.dmtf.org/cimi/2/SystemService

| Attribute | Type | Description |
|-----------|------|--------------|
| serviceType | URI | Unique URI identifying this particular service. It shall be of the form: `http://schemas.dmtf.org/cimi/2/SystemService/<servicename>` where `<servicename>` is the end of the path, possibly a subpath. |
| machines | Collection [Machine] | A reference to the list of references to Machines that are managed under this SystemService. The Resource item type may be a variant of Machine in case accessory attributes are added. These items are **not child components**: deleting the SystemService shall not delete the Machines. |
| volumes | Collection [Volume] | A reference to the list of references to Volumes that are managed under this SystemService. The Resource item type may be a variant of Volume in case accessory attributes are added. These items are **not child components**: deleting the SystemService shall not delete the Volumes. |
| systems | Collection [System] | A reference to the list of references to Systems or sub-Systems managed under this SystemService. The Resource item type may be a variant of System. These items are **not child components**: deleting the SystemService shall not delete the Systems. |
| parameters | map | A list of attributes specific to this SystemService, associated with a particular `serviceType` value. |

---

## 5.13.3.1 HighReliability Service Resource

This service allows a System to recover from the failures of its Machines; the service intervenes when the Machine stops working — typically when the System does not receive the Machine heartbeat anymore. This service protects from hardware and software failures, e.g., hardware node failure or a software process crash.

---

## Table 11 – SystemService Attributes for HighReliability Service

**Name:** SystemService  
**Type URI:** http://schemas.dmtf.org/cimi/2/SystemService

| Attribute | Type | Description |
|-----------|------|--------------|
| serviceType | URI | `http://schemas.dmtf.org/cimi/2/SystemService/highreliability/active` or `http://schemas.dmtf.org/cimi/2/SystemService/highreliability/passive` |
| machines | Collection [RecoverableMachine] | A reference to the collection of Machines in the System managed under this SystemService. Adding a Machine reference here means the Machine is protected by this recovery service. These items are **not components**: deleting the SystemService does not delete the Machines. |
| parameters | map | - If the `serviceType` ends with `/highreliability/active`, each listed Machine has a backup Machine that takes over in case of failure.<br> - If the `serviceType` ends with `/highreliability/passive`, each listed Machine has an up-to-date MachineImage, from which a backup Machine is created to replace a failed Machine.<br> The details of behavior (e.g., failover detection) depend on the Provider’s implementation and can be controlled by additional parameters. |
| networkServices | Collection [Network Service] | A reference to the NetworkServiceCollection within the System that supports this SystemService. |
| heartbeat | Integer | Heartbeat frequency, in milliseconds between one heartbeat and the next. |
| replicationType | String | The kind of Machine replication status. Allowed values: `synchronous`, `asynchronous`, `none`, `onlyAtClusterCreation`. |
| RPO | Integer | Recovery Point Objective (duration in minutes) in case of asynchronous disk replica. |

---

## 5.13.3.1.1 RecoverableMachine Collection

The referred Resource type for each item of this Collection is **“Machine”**. Because there are accessory attributes, this is an enhanced Machine Collection.

### Table 12 – RecoverableMachine Accessory Attribute

| Name | Type | Description |
|------|------|--------------|
| backupmachine | ref | An additional reference to the backup Machine in the same System that supports the Machine referenced by this collection item. |


### 5.13.3.1.2 Operations (HighReliability SystemService)

The **HighReliability SystemService Resource** supports the **Read**, **Update**, and **Delete** operations. **Create** is supported through the SystemService Collection Resource.

Adding a Machine to the collection (see the **addRM** operation) implies that a backup Machine shall be created and the `backupmachine` attribute shall be assigned to this copy (even if it is not a running Machine, but only a “passive” copy ready to be executed in case of failure). The way the backup copy is created depends on the Provider implementation — it is expected that an image of the recoverable Machine is taken and from this image a new Machine is created.

If the Consumer also gives the backup Machine reference as input parameter, it is assumed that the backup Machine is that referenced Machine and no new backup Machines shall be created.

A backup Machine may also be added as part of the list of recoverable Machines (i.e., in the `machines` collection of the SystemService). This amounts to defining a daisy-chain of two (or more) backup Machines for the original (primary) recoverable Machine subject to the system service.

**The following custom operations are defined:**

---

**forceSync**  
`/link@rel: http://schemas.dmtf.org/cimi/2/action/forceSync`  
This operation shall synchronize the state of a node onto its backup node, regardless of the scheduled synchronization time as dictated by the recovery policies. The result depends on the Provider implementation and the status of the backup Machine; typically this applies when the backup Machine is created by an image copy of the recoverable Machine.

- **Input parameters:** `"node"` (primary node) — type: `ref` — mandatory  
- **Output parameters:** None

---

**swapBackup**  
`/link@rel: http://schemas.dmtf.org/cimi/2/action/swapBackup`  
This operation shall swap a Machine and its backup Machine — i.e., replace the Machine with its backup and vice versa. Some Providers may choose to not make this operation available.

- **Input parameters:** `"node"` — type: `ref` — mandatory (the Machine to be replaced by its backup)  
- **Output parameters:** None

---

**addRM**  
`/link@rel: http://schemas.dmtf.org/cimi/2/action/addRM`  
This operation adds a recoverable Machine (RM) to the collection of recoverable Machines under this service. It adds the reference of the Machine to the `machines` collection and optionally a reference to the backup Machine (accessory attribute `backupmachine`).

- **Input parameters:**  
  - `"node"` — type: `ref` — mandatory (Machine to be added)  
  - `"backup"` — type: `ref` — optional (Machine to be used as backup)
- **Output parameters:** None

---

**removeRM**  
`/link@rel: http://schemas.dmtf.org/cimi/2/action/removeRM`  
This operation removes a recoverable Machine (RM) from the collection under this service. It removes the reference from the `machines` collection and discards the backup Machine.

- **Input parameters:** `"node"` — type: `ref` — mandatory (Machine to be removed)  
- **Output parameters:** None

---

## 5.13.3.2 DisasterRecovery Service Resource

This service allows for a System to recover from a data center failure — by maintaining a remote, up-to-date image of the System. Unlike the HighReliability service, which defines advanced recovery techniques for different failure types, the DisasterRecovery service specifically addresses data center failure and provides the mechanism to re-start crashed resources in a remote data center.

In the event of a data center failure where other advanced approaches fail, this service guarantees restoration of resources, although some service downtime will occur — there should be no expectation of a fully “transparent” transition.

Typically, DisasterRecovery can be offered by default for every Machine, though some Providers might activate it as an explicit feature or allow the Consumer to choose the remote datacenter location.

**Table 13 – SystemService Attributes for DisasterRecovery Service**

**Name:** SystemService  
**Type URI:** http://schemas.dmtf.org/cimi/2/SystemService

| Attribute | Type | Description |
|-----------|------|--------------|
| serviceType | URI | `http://schemas.dmtf.org/cimi/2/SystemService/disasterrecovery/` |
| machines | Collection [Machine] | A reference to the collection of Machines in the System that are managed under this SystemService. Adding a Machine here means it benefits from recovery service. These items are **not components**: deleting the SystemService does not delete the Machines. Behavior depends on Provider’s implementation. |
| parameters | map | Service-specific configuration data. |
| backupDataCenter | URI | Identity of the backup data center or cloud to be used as backup. |
| backupCEP | ref | Reference to the CEP in the backup DC under which the recovery resources are provisioned. |
| networkServices | Collection [Network Service] | A reference to the NetworkServiceCollection within the System that supports this SystemService. |

---

### 5.13.3.2.1 Operations

The **DisasterRecovery SystemService Resource** supports the **Read**, **Update**, and **Delete** operations. **Create** is supported through the SystemService Collection Resource.

**addRM**  
`/link@rel: http://schemas.dmtf.org/cimi/2/action/addRM`  
This operation adds a recoverable Machine (RM) to the collection under this service.

- **Input parameters:** `"node"` — type: `ref` — mandatory (Machine to be added)  
- **Output parameters:** None

---

**removeRM**  
`/link@rel: http://schemas.dmtf.org/cimi/2/action/removeRM`  
This operation removes a recoverable Machine (RM) from the collection under this service.

- **Input parameters:** `"node"` — type: `ref` — mandatory (Machine to be removed)  
- **Output parameters:** None
