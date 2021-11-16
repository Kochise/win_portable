/****************************************************************************
 *                                                                          *
 * File    : dbginfo.h                                                      *
 *                                                                          *
 * Purpose : Pelles C debug information definitions.                        *
 *                                                                          *
 * History : Date      Reason                                               *
 *           15-12-15  Created                                              *
 *           16-08-14  Extended linenums from 16-bit to 32-bit.             *
 *           17-08-14  Added PODBG_SYM_ICONST32_T.                          *
 *           19-08-23  Added PODBG_SYM_LDEAD_T.                             *
 *                                                                          *
 ****************************************************************************/

#ifndef H_DBGINFO
#define H_DBGINFO

#include <dbgconst.h>
#include <stdint.h>

#include <pshpack1.h>  /* strict packing */

/*
 * Debug section signature (.debug$T, .debug$S, ...)
 */
typedef struct PODBG_IDENT_T {
    uint32_t signature;                     /* PODBG_SIGNATURE */
    uint32_t version;                       /* PODBG_SYMBOLS_VERSION / PODBG_TYPES_VERSION / ... */
} PODBG_IDENT_T;


/*
 * Debug directory signature.
 */
typedef struct PODBG_DBGDIR_IDENT_T {
    uint32_t signature;                     /* PODBG_SIGNATURE */
    uint32_t offset;                        /* offset to debug directory header */
} PODBG_DBGDIR_IDENT_T;


/*
 * Debug directory header.
 */
typedef struct PODBG_DBGDIR_HEADER_T {
    uint16_t size_header;                   /* size of this structure (in bytes) */
    uint16_t size_entry;                    /* size of each directory entry (in bytes) */
    uint32_t nentries;                      /* number of directory entries */
    uint32_t flags;                         /* flags (not used) */
} PODBG_DBGDIR_HEADER_T;

/*
 * Debug directory entry.
 */
typedef struct PODBG_DBGDIR_ENTRY_T {
    uint16_t kind;                          /* subsection kind (PODBG_SUBSECT_T) */
    uint16_t modnum;                        /* module number, or PODBG_MODULE_NUMBER_NONE */
    uint32_t offset;                        /* offset to subsection data */
    uint32_t length;                        /* length of subsection data */
} PODBG_DBGDIR_ENTRY_T;


/*
 * Modules subsection.
 */
typedef struct PODBG_MODULE_SECTION_T {
    uint16_t scnum;                         /* COFF section number */
    uint16_t reserved;                      /* --reserved-- */
    uint32_t offset;                        /* offset of section */
    uint32_t length;                        /* length of section */
} PODBG_MODULE_SECTION_T;

typedef struct PODBG_MODULE_T {
    uint16_t nscns;                         /* number of sections in module */
    uint16_t reserved;                      /* --reserved-- */
    PODBG_MODULE_SECTION_T scn[/*nscns*/];  /* array of sections in module */
    /* char name[] */                       /* nul-terminated UTF-8 name of module */
} PODBG_MODULE_T;


/*
 * Sources subsection.
 */
typedef struct PODBG_SRCMODULE_T {
    uint16_t nfiles;                        /* number of source files contributing code to sections */
    uint16_t nscns;                         /* number of code sections receiving code from this module */
    uint32_t file_start[/*nfiles*/];        /* offset to PODBG_SRCFILE_T */
    /* PODBG_RANGE_T ranges[nscns] */       /* array of code ranges per section */
    /* uint16_t scnums[nscns] */            /* array of section numbers that receive code from this module */
} PODBG_SRCMODULE_T;

typedef struct PODBG_SRCFILE_T {
    uint16_t nscns;                         /* number of sections that receive code from this source file */
    uint8_t csumkind;                       /* checksum kind (PODBG_CHECKSUM_T) */
    uint8_t csumsize;                       /* checksum size */
    uint8_t csumdata[/*csumsize*/];         /* checksum data */
    /* uint32_t line_start[nscns] */        /* array of offsets to PODBG_SOURCELINE per section */
    /* PODBG_RANGE_T ranges[nscns] */       /* array of code ranges per section */
    /* char name[] */                       /* nul-terminated UTF-8 name of source file */
} PODBG_SRCFILE_T;

typedef struct PODBG_SRCLINE_T {
    uint16_t scnum;                         /* COFF section number */
    uint16_t nlines;                        /* number of line/offset pairs */
    uint32_t offset[/*nlines*/];            /* array of section offsets */
    /* uint32_t lineno[nlines] */           /* array of line numbers */
} PODBG_SRCLINE_T;

typedef struct PODBG_RANGE_T {
    uint32_t offset_start;                  /* offset to beginning */
    uint32_t offset_end;                    /* offset to end */
} PODBG_RANGE_T;


/*
 * Types subsection.
 */
typedef struct PODBG_TYPES_T {
    uint32_t ntypes;                        /* number of types */
    uint32_t offset[/*ntypes*/];            /* array of offset to types */
    /* uint32_t types[] */
} PODBG_TYPES_T;


/*
 * Symbol records.
 */

typedef struct PODBG_SYM_GENERIC_T {
    uint16_t length;                        /* length of symbol info */
    uint16_t kind;                          /* symbol kind: PODBG_SYM_xxx */
} PODBG_SYM_GENERIC_T;

typedef struct PODBG_SYM_UDT_T {
    uint16_t length;                        /* length of symbol info */
    uint16_t kind;                          /* symbol kind: PODBG_SYM_UDT */
    uint32_t type;                          /* type (primitive, or complex type index) */
    char name[1];                           /* nul-terminated UTF-8 name of user-defined type */
} PODBG_SYM_UDT_T;

typedef struct PODBG_SYM_REG_T {
    uint16_t length;                        /* length of symbol info */
    uint16_t kind;                          /* symbol kind: PODBG_SYM_REG */
    uint32_t type;                          /* type (primitive, or complex type index) */
    uint16_t reg;                           /* register enumerate (PODBG_REG_T) */
    char name[1];                           /* nul-terminated UTF-8 name of symbol */
} PODBG_SYM_REG_T;

typedef struct PODBG_SYM_REG_RANGE_T {
    uint16_t length;                        /* length of symbol info */
    uint16_t kind;                          /* symbol kind: PODBG_SYM_REG_RANGE */
    uint32_t type;                          /* type (primitive, or complex type index) */
    uint32_t lineno_start;                  /* first source line number */
    uint32_t lineno_end;                    /* last source line number */
    uint16_t reg;                           /* register enumerate (PODBG_REG_T) */
    char name[1];                           /* nul-terminated UTF-8 name of symbol */
} PODBG_SYM_REG_RANGE_T;

typedef struct PODBG_SYM_REGREL_T {
    uint16_t length;                        /* length of symbol info */
    uint16_t kind;                          /* symbol kind: PODBG_SYM_REGREL */
    int32_t offset;                         /* signed offset relative the register */
    uint32_t type;                          /* type (primitive, or complex type index) */
    uint16_t reg;                           /* register enumerate (PODBG_REG_T) */
    char name[1];                           /* nul-terminated UTF-8 name of symbol */
} PODBG_SYM_REGREL_T;

typedef struct PODBG_SYM_DATA_T {
    uint16_t length;                        /* length of symbol info */
    uint16_t kind;                          /* symbol kind: PODBG_SYM_LDATA / PODBG_SYM_GDATA */
    uint32_t type;                          /* type (primitive, or complex type index) */
    uint32_t offset;                        /* offset portion of the symbol address */
    uint16_t scnum;                         /* section number portion of the symbol address */
    char name[1];                           /* nul-terminated UTF-8 name of symbol */
} PODBG_SYM_LDATA_T,
  PODBG_SYM_GDATA_T;

typedef struct PODBG_SYM_THREAD_T {
    uint16_t length;                        /* length of symbol info */
    uint16_t kind;                          /* symbol kind: PODBG_SYM_LTHREAD / PODBG_SYM_GTHREAD */
    uint32_t type;                          /* type (primitive, or complex type index) */
    uint32_t offset;                        /* offset portion of the TLS address */
    uint16_t scnum;                         /* section number portion of the TLS address */
    char name[1];                           /* nul-terminated UTF-8 name of symbol */
} PODBG_SYM_LTHREAD_T,
  PODBG_SYM_GTHREAD_T;

typedef struct PODBG_SYM_LABEL_T {
    uint16_t length;                        /* length of symbol info */
    uint16_t kind;                          /* symbol kind: PODBG_SYM_LABEL */
    uint32_t offset;                        /* offset portion of the label address */
    uint16_t scnum;                         /* section number portion of the label address */
    uint16_t flags;                         /* --reserved-- */
    char name[1];                           /* nul-terminated UTF-8 name of label */
} PODBG_SYM_LABEL_T;

typedef struct PODBG_SYM_FUNC_T {
    uint16_t length;                        /* length of symbol info */
    uint16_t kind;                          /* symbol kind: PODBG_SYM_LFUNC / PODBG_SYM_GFUNC */
    uint32_t size;                          /* size of this function (in bytes) */
    uint32_t offset_body_start;             /* body start offset (in bytes) */
    uint32_t offset_body_end;               /* body end offset (in bytes) */
    uint32_t type;                          /* type (primitive, or complex type index) */
    uint32_t offset;                        /* offset portion of the function address */
    uint16_t scnum;                         /* section number portion of the function address */
    uint8_t flags;                          /* function flags (PODBG_SYM_FUNC_FLAG_xxx) */
    char name[1];                           /* nul-terminated UTF-8 name of function */
} PODBG_SYM_LFUNC_T,
  PODBG_SYM_GFUNC_T;

typedef struct PODBG_SYM_COMPILE_T {
    uint16_t length;                        /* length of symbol info */
    uint16_t kind;                          /* symbol kind: PODBG_SYM_COMPILE */
    uint16_t machine;                       /* target machine (PODBG_MACHINE_T) */
    uint8_t language;                       /* development language (PODBG_LANGUAGE_T) */
    uint8_t reserved;                       /* --reserved-- */
    uint16_t vermajor;                      /* major version */
    uint16_t verminor;                      /* minor version */
    uint16_t verbuild;                      /* build version */
    char verstr[1];                         /* nul-terminated compiler version string */
} PODBG_SYM_COMPILE_T;

typedef struct PODBG_SYM_OBJNAME_T {
    uint16_t length;                        /* length of symbol info */
    uint16_t kind;                          /* symbol kind: PODBG_SYM_OBJNAME */
    char name[1];                           /* nul-terminated UTF-8 name of object file */
} PODBG_SYM_OBJNAME_T;

typedef struct PODBG_SYM_PUBLIC_T {
    uint16_t length;                        /* length of symbol info */
    uint16_t kind;                          /* symbol kind: PODBG_SYM_PUBLIC */
    uint32_t size;                          /* size (in bytes) */
    uint32_t type;                          /* type (primitive, or complex type index) */
    uint32_t offset;                        /* offset portion of the symbol address */
    uint16_t scnum;                         /* section number portion of the symbol address */
    uint16_t flags;                         /* --reserved-- */
    char name[1];                           /* nul-terminated UTF-8 name of symbol */
} PODBG_SYM_PUBLIC_T;

typedef struct PODBG_SYM_ICONST32_T {
    uint16_t length;                        /* length of symbol info */
    uint16_t kind;                          /* symbol kind: PODBG_SYM_ICONST32 */
    uint32_t type;                          /* type (primitive, or complex type index) */
    uint32_t value;                         /* integer value */
    char name[1];                           /* nul-terminated UTF-8 name of symbol */
} PODBG_SYM_ICONST32_T;

typedef struct PODBG_SYM_DEAD_T {
    uint16_t length;                        /* length of symbol info */
    uint16_t kind;                          /* symbol kind: PODBG_SYM_LDEAD */
    uint32_t type;                          /* type (primitive, or complex type index) */
    char name[1];                           /* nul-terminated UTF-8 name of user-defined type */
} PODBG_SYM_LDEAD_T;


typedef union PODBG_SYM_GROUP_T {
    PODBG_SYM_GENERIC_T any;
    PODBG_SYM_UDT_T udt;
    PODBG_SYM_REG_T reg;
    PODBG_SYM_REG_RANGE_T regr;
    PODBG_SYM_REGREL_T regrel;
    PODBG_SYM_GDATA_T data;
    PODBG_SYM_GTHREAD_T thrd;
    PODBG_SYM_LABEL_T lab;
    PODBG_SYM_GFUNC_T fcn;
    PODBG_SYM_COMPILE_T comp;
    PODBG_SYM_OBJNAME_T obj;
    PODBG_SYM_PUBLIC_T pub;
    PODBG_SYM_ICONST32_T cnst;
    PODBG_SYM_LDEAD_T dead;
} PODBG_SYM_GROUP_T;


/*
 * Complex type records.
 */

typedef struct PODBG_LEAF_GENERIC_T {
    uint16_t length;                        /* length of type info */
    uint16_t kind;                          /* leaf kind */
    uint8_t variant[];                      /* type info (variable) */
} PODBG_LEAF_GENERIC_T;

/*
 * Group 1: Leaf indices starting records referenced from symbol records.
 */
typedef struct PODBG_LEAF_MODIFIER_T {
    uint16_t length;                        /* length of type info (part of alignment) */
    uint16_t kind;                          /* leaf kind: PODBG_LEAF_MODIFIER */
    uint32_t type;                          /* type (primitive, or complex type index) of the modified type */
    uint32_t flags;                         /* modifier flags (PODBG_LEAF_MODIFIER_FLAG_xxx) */
} PODBG_LEAF_MODIFIER_T;

typedef struct PODBG_LEAF_POINTER_T {
    uint16_t length;                        /* length of type info (part of alignment) */
    uint16_t kind;                          /* leaf kind: PODBG_LEAF_POINTER */
    uint32_t type;                          /* type (primitive, or complex type index) of object pointed to */
    uint32_t flags;                         /* pointer flags (PODBG_LEAF_POINTER_FLAG_xxx) */
} PODBG_LEAF_POINTER_T;

typedef struct PODBG_LEAF_ARRAY_T {
    uint16_t length;                        /* length of type info (part of alignment) */
    uint16_t kind;                          /* leaf kind: PODBG_LEAF_ARRAY */
    uint32_t type;                          /* type (primitive, or complex type index) of element type */
    uint32_t size;                          /* size of this array (in bytes) */
} PODBG_LEAF_ARRAY_T;

typedef struct PODBG_LEAF_VARARRAY_T {
    uint16_t length;                        /* length of type info (part of alignment) */
    uint16_t kind;                          /* leaf kind: PODBG_LEAF_VARARRAY */
    uint32_t type_elem;                     /* type (primitive, or complex type index) of element type */
    uint32_t type_size;                     /* type (complex type index) of size */
} PODBG_LEAF_VARARRAY_T;

typedef struct PODBG_LEAF_STRUCT_T {
    uint16_t length;                        /* length of type info (part of alignment) */
    uint16_t kind;                          /* leaf kind: PODBG_LEAF_STRUCT or PODBG_LEAF_UNION */
    uint16_t flags;                         /* struct or union flags (PODBG_LEAF_STRUCT_FLAG_xxx) */
    uint16_t nfields;                       /* number of fields */
    uint32_t type_fields;                   /* type index of PODBG_LEAF_FIELDLIST */
    uint32_t size;                          /* size of this struct or union (in bytes) */
    char name[1];                           /* nul-terminated UTF-8 tag name */
} PODBG_LEAF_STRUCT_T;

typedef struct PODBG_LEAF_ENUM_T {
    uint16_t length;                        /* length of type info (part of alignment) */
    uint16_t kind;                          /* leaf kind: PODBG_LEAF_ENUM */
    uint32_t type_elem;                     /* type (primitive, or complex type index) of elements */
    uint32_t type_members;                  /* type index of PODBG_LEAF_FIELDLIST */
    uint16_t nmembers;                      /* number of members in enumeration */
    char name[1];                           /* nul-terminated UTF-8 name of enum tag */
} PODBG_LEAF_ENUM_T;

typedef struct PODBG_LEAF_FUNCTION_T {
    uint16_t length;                        /* length of type info (part of alignment) */
    uint16_t kind;                          /* leaf kind: PODBG_LEAF_FUNCTION */
    uint32_t type_return;                   /* type (primitive, or complex type index) of return value */
    uint32_t type_parms;                    /* type index of PODBG_LEAF_PARMLIST */
    uint8_t call_conv;                       /* calling convention (PODBG_CALL_T) */
    uint8_t reserved[3];                    /* --reserved-- */
} PODBG_LEAF_FUNCTION_T;


/*
 * Group 2: Leaf indices starting records only referenced from type records.
 */

typedef struct PODBG_LEAF_PARMLIST_T {
    uint16_t length;                        /* length of type info (part of alignment) */
    uint16_t kind;                          /* leaf kind: PODBG_LEAF_PARMLIST */
    uint32_t nparms;                        /* number of parameters */
    uint32_t type_parms[/*nparms*/];        /* array of parameter types */
} PODBG_LEAF_PARMLIST_T;

typedef struct PODBG_LEAF_FIELDLIST_T {
    uint16_t length;                        /* length of type info (part of alignment) */
    uint16_t kind;                          /* leaf kind: PODBG_LEAF_FIELDLIST */
    uint8_t variant[];                      /* list of sub leafs */
} PODBG_LEAF_FIELDLIST_T;

typedef struct PODBG_LEAF_BITFIELD_T {
    uint16_t length;                        /* length of type info (part of alignment) */
    uint16_t kind;                          /* leaf kind: PODBG_LEAF_BITFIELD */
    uint32_t type;                          /* type index of bit-field */
    uint8_t nbits;                          /* number of bits (length) */
    uint8_t position;                       /* starting position (from bit 0) */
} PODBG_LEAF_BITFIELD_T;

typedef struct PODBG_LEAF_DIMCNST_T {
    uint16_t length;                        /* length of type info (part of alignment) */
    uint16_t kind;                          /* leaf kind: PODBG_LEAF_DIMCNST */
    uint32_t size;                          /* size of this dimension (in bytes) */
} PODBG_LEAF_DIMCNST_T;

typedef struct PODBG_LEAF_REFSYM_T {
    uint16_t length;                        /* length of type info (part of alignment) */
    uint16_t kind;                          /* leaf kind: PODBG_LEAF_REFSYM */
    uint8_t data[];                         /* copy of referenced symbol record (including length) */
} PODBG_LEAF_REFSYM_T;


typedef union PODBG_LEAF_GROUP_T {
    PODBG_LEAF_GENERIC_T any;
    PODBG_LEAF_MODIFIER_T mod;
    PODBG_LEAF_POINTER_T ptr;
    PODBG_LEAF_ARRAY_T arr;
    PODBG_LEAF_VARARRAY_T vla;
    PODBG_LEAF_STRUCT_T str;
    PODBG_LEAF_ENUM_T enm;
    PODBG_LEAF_FUNCTION_T fcn;
    PODBG_LEAF_PARMLIST_T prms;
    PODBG_LEAF_FIELDLIST_T flds;
    PODBG_LEAF_BITFIELD_T bit;
    PODBG_LEAF_DIMCNST_T dim;
    PODBG_LEAF_REFSYM_T ref;
} PODBG_LEAF_GROUP_T;


/*
 * Group 3: Leaf indices for fields of complex lists.
 */

typedef struct PODBG_SUBLEAF_GENERIC_T {
    uint16_t kind;                          /* leaf kind */
    uint8_t variant[];                      /* type info (variable) */
} PODBG_SUBLEAF_GENERIC_T;

typedef struct PODBG_SUBLEAF_FIELD16_T {
    uint16_t kind;                          /* leaf kind: PODBG_SUBLEAF_FIELD16 */
    uint16_t offset;                        /* field offset in aggregate */
    uint32_t type;                          /* type (primitive, or complex type index) of field */
    char name[1];                           /* nul-terminated UTF-8 name of field */
} PODBG_SUBLEAF_FIELD16_T;

typedef struct PODBG_SUBLEAF_FIELD32_T {
    uint16_t kind;                          /* leaf kind: PODBG_SUBLEAF_FIELD32 */
    uint16_t reserved;                      /* --reserved-- */
    uint32_t offset;                        /* field offset in aggregate */
    uint32_t type;                          /* type (primitive, or complex type index) of field */
    char name[1];                           /* nul-terminated UTF-8 name of field */
} PODBG_SUBLEAF_FIELD32_T;

typedef struct PODBG_SUBLEAF_ENUM32_T {
    uint16_t kind;                          /* leaf kind: PODBG_SUBLEAF_ENUM32 */
    uint16_t reserved;                      /* --reserved-- */
    int32_t value;                          /* field value */
    char name[1];                           /* nul-terminated UTF-8 name of member */
} PODBG_SUBLEAF_ENUM32_T;


typedef union PODBG_SUBLEAF_GROUP_T {
    PODBG_SUBLEAF_GENERIC_T any;
    PODBG_SUBLEAF_FIELD16_T fld16;
    PODBG_SUBLEAF_FIELD32_T fld32;
    PODBG_SUBLEAF_ENUM32_T enm32;
} PODBG_SUBLEAF_GROUP_T;

#include <poppack.h>  /* back to default */

#endif /* H_DBGINFO */
