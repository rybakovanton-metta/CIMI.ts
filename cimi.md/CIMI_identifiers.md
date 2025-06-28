<!-- 
This content is derived from the DMTF Cloud Infrastructure Management Interface (CIMI) Specification
DSP0263 Version 2.0.0, Copyright © 2012, 2013, 2016 Distributed Management Task Force, Inc. (DMTF)
Original specification: https://www.dmtf.org/standards/cimi
-->

## 5.2 Identifiers

All identifiers (e.g., Resource names, attributes, operations, parameter names) defined by this specification, or defined by way of an extension, shall adhere to the following rules:

- Identifier names shall be treated as case sensitive.
- Identifier names shall only use the following set of characters:  
  - Uppercase ASCII (U+0041 through U+005A)  
  - Lowercase ASCII (U+0061 through U+007A)  
  - Digits (U+0030 through U+0039)  
  - Underscore (U+005F)
- Identifier names shall **not** start with a Digit (U+0030 through U+0039).

> **Note:** These rules do **not** apply to the `name` common attribute defined in clause 5.7.1.  
