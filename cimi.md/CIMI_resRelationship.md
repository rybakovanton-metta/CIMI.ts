<!-- 
This content is derived from the DMTF Cloud Infrastructure Management Interface (CIMI) Specification
DSP0263 Version 2.0.0, Copyright © 2012, 2013, 2016 Distributed Management Task Force, Inc. (DMTF)
Original specification: https://www.dmtf.org/standards/cimi
-->

## 5.10 Relationships between Resources

### 5.10.1 Referencing across Resources

Resources may refer each other. This referencing expresses a directional relationship in which there is a referring Resource and a referred Resource. Depending on the cardinality of such relationships, there are two representations:

- **1-to-1 referencing**  
  The URL of the referred Resource appears as an attribute in the referring Resource.

- **1-to-n referencing**  
  The referred Resources (all of the same type) are grouped in a Collection, the URL of which appears as an attribute in the referring Resource. In that case, the referring Resource does not refer directly to the referred Resources, but instead to a Collection Resource that contains references to the referred Resources.

If a referred Resource is deleted but not the referring Resource(s):

- In a **1-to-1** relationship the reference shall be set to empty in every referring Resource.
- In a **1-to-n** relationship the reference shall be removed from any Collection where it appears as an item.

### 5.10.2 Composition relationship between Resources

A Resource is a child component of another Resource if its `parent` attribute refers to the latter Resource. This relationship is transitive.

- If a Resource is deleted, its child component Resources are also automatically deleted.
- In the case of a Collection Resource that is referred by a Resource **R**, expressing a composition relationship from the Collection Resource items to **R** is done by:  
  1. setting the `parent` attribute of each Resource item to the Collection Resource, and  
  2. setting the `parent` attribute of the Collection Resource to the Resource **R**.

A Resource is said to be **parent** of its children components.

- In any Resource description **R** throughout this specification, an attribute of type `collection[]` refers to a Collection Resource that has the Resource **R** as a parent, unless indicated otherwise.
- For example, a Machine is parent of its related Disk Resources via the `disks` Collection: the `parent` attribute of a Disk is set to the `disks` Collection, and the `parent` attribute of the `disks` Collection is set to the Machine.

Some composed Resources – e.g., System – may have component Resources that are not their “children.” Such Resources are called **associated components**. Their `parent` attribute refers to another Resource or to the Cloud Entry Point (CEP), meaning the deletion of the composed Resource does not cause the deletion of its associated components, even if the associated components are still otherwise managed by the composed Resource.  
