<!-- 
This content is derived from the DMTF Cloud Infrastructure Management Interface (CIMI) Specification
DSP0263 Version 2.0.0, Copyright © 2012, 2013, 2016 Distributed Management Task Force, Inc. (DMTF)
Original specification: https://www.dmtf.org/standards/cimi
-->

## 5.1 Extensibility

There are two types of extensibility mechanisms defined by the CIMI model:

1. **Consumer-side extensibility**  
   Allows a CIMI Consumer to add additional data to a Resource via the `properties` attribute.  
   - Each Resource in the CIMI model has an attribute called `properties`.  
   - When creating or updating a Resource, Consumers may store any name/value pair in `properties`.  
   - CIMI Providers shall store and return these values to the Consumer but are **not** required to understand or act upon them—they exist solely for the Consumer’s convenience.  
   - Providers **shall not** add elements to the `properties` attribute.

2. **Provider-side extensibility**  
   Uses the **ResourceMetadata** Resource to define Provider-specific extensions. ResourceMetadata may be used to:  
   - **Express constraints** on existing CIMI-defined Resource attributes  
     - e.g., enforce a maximum for the `cpu` attribute of the MachineConfiguration Resource.  
   - **Introduce new attributes** to CIMI-defined Resources (with constraints)  
     - e.g., add a `location` attribute to the Volume Resource, constrained to a fixed set of strings.  
   - **Introduce new operations** for CIMI-defined Resources  
     - e.g., define a `compress` operation for the Volume Resource.  
   - **Advertise Provider-specific capabilities or features**  
     - e.g., specify how long a Job Resource is retained after completion before deletion.  

> It is recommended that Providers use the ResourceMetadata Resource to advertise these attributes, operations, and capabilities (along with any necessary constraints).  
> The ResourceMetadata Resource is defined in clause 5.8.  
