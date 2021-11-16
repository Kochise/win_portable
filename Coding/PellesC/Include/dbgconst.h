/****************************************************************************
 *                                                                          *
 * File    : dbgconst.h                                                     *
 *                                                                          *
 * Purpose : Pelles C debug information constant definitions.               *
 *                                                                          *
 * History : Date      Reason                                               *
 *           15-12-15  Created                                              *
 *           17-08-14  Added PODBG_SYM_ICONST32.                            *
 *           19-02-11  Added PODBG_REG_X64_XMM16 - PODBG_REG_X64_ZMM31.     *
 *           19-05-21  Added PODBG_CALL_VECT.                               *
 *           19-08-15  Removed unused PODBG_PUBLIC_SYMBOL_VERSION.          *
 *           19-08-19  Changed current signature to PODBG_SIGNATURE_V2.     *
 *           19-08-23  Added PODBG_SYM_LDEAD.                               *
 *           19-08-23  Changed symbols version to PODBG_SYMBOLS_VERSION_2.  *
 *           21-05-20  Deprecated all complex math crap.                    *
 *                                                                          *
 ****************************************************************************/

#ifndef H_DBGCONST
#define H_DBGCONST

#define IMAGE_DEBUG_TYPE_PELLESC  65535  /* unlikely to clash with Microsoft (since they seem to count upwards from 1) */

#define PODBG_MAKE_SIGNATURE(n1,n2,n3,n4)  ((n1)|((n2)<<8)|((n3)<<16)|((n4)<<24))
#define PODBG_SIGNATURE_V1  PODBG_MAKE_SIGNATURE('P','O','1','0')  /* Pelles C v9 */
#define PODBG_SIGNATURE_V2  PODBG_MAKE_SIGNATURE('P','O','1','1')  /* Pelles C v10 (UTF-8 encoded names) */

/* Current signature */
#define PODBG_SIGNATURE  PODBG_SIGNATURE_V2

/* Known versions */
#define PODBG_SYMBOLS_VERSION_1  1  /* POCC v9, POASM v9/v10 */
#define PODBG_SYMBOLS_VERSION_2  2  /* POCC v10 */
#define PODBG_TYPES_VERSION_1  1    /* POCC v9/v10, POASM v9/v10 */

/* Current versions */
#define PODBG_SYMBOLS_VERSION  PODBG_SYMBOLS_VERSION_2
#define PODBG_TYPES_VERSION  PODBG_TYPES_VERSION_1

/* Symbol kinds */
typedef enum PODBG_SYM_T {
    PODBG_SYM_UDT = 0x0001,             /* user-defined type */
    PODBG_SYM_REG = 0x0002,             /* register variable */
    PODBG_SYM_REG_RANGE = 0x0003,       /* register variable, with live range */
    PODBG_SYM_REGREL = 0x0004,          /* register-relative address */
    PODBG_SYM_LDATA = 0x0005,           /* module-local data */
    PODBG_SYM_GDATA = 0x0006,           /* global data */
    PODBG_SYM_LTHREAD = 0x0007,         /* local thread storage */
    PODBG_SYM_GTHREAD = 0x0008,         /* global thread storage */
    PODBG_SYM_LABEL = 0x0009,           /* code label */
    PODBG_SYM_LFUNC = 0x000A,           /* module-local function start */
    PODBG_SYM_GFUNC = 0x000B,           /* global function start */
    PODBG_SYM_FEND = 0x000C,            /* function end */
    PODBG_SYM_COMPILE = 0x000D,         /* compiler info */
    PODBG_SYM_OBJNAME = 0x000E,         /* object file */
    PODBG_SYM_PUBLIC = 0x000F,          /* public symbol (linker generated) */
    PODBG_SYM_ICONST32 = 0x0010,        /* 32-bit integer constant */
    PODBG_SYM_LDEAD = 0x0011,           /* dead local variable */
} PODBG_SYM_T;

/* Machine enumeration */
typedef enum PODBG_MACHINE_T {
    PODBG_MACHINE_X86 = 0x10,
    PODBG_MACHINE_X64 = 0x20,
    PODBG_MACHINE_AMD64 = PODBG_MACHINE_X64,
} PODBG_MACHINE_T;

/* Language enumeration */
typedef enum PODBG_LANGUAGE_T {
    PODBG_LANGUAGE_UNKNOWN = 0x00,
    PODBG_LANGUAGE_C = 0x01,
    PODBG_LANGUAGE_ASM = 0x02,
} PODBG_LANGUAGE_T;

/* Subsection enumeration */
typedef enum PODBG_SUBSECT_T {
    PODBG_SUBSECT_MODULE = 0x101,
    PODBG_SUBSECT_SRCMODULE = 0x102,
    PODBG_SUBSECT_SYMBOLS = 0x103,
    PODBG_SUBSECT_PUBLICS = 0x104,
    PODBG_SUBSECT_TYPES = 0x105,
} PODBG_SUBSECT_T;

/* Register enumeration */
typedef enum PODBG_REG_T {
    /* X86 architecture */
    PODBG_REG_X86_NONE = 0,
    PODBG_REG_X86_FIRST = 0,
    PODBG_REG_X86_AL = 1,
    PODBG_REG_X86_CL = 2,
    PODBG_REG_X86_DL = 3,
    PODBG_REG_X86_BL = 4,
    PODBG_REG_X86_AH = 5,
    PODBG_REG_X86_CH = 6,
    PODBG_REG_X86_DH = 7,
    PODBG_REG_X86_BH = 8,
    PODBG_REG_X86_AX = 9,
    PODBG_REG_X86_CX = 10,
    PODBG_REG_X86_DX = 11,
    PODBG_REG_X86_BX = 12,
    PODBG_REG_X86_SP = 13,
    PODBG_REG_X86_BP = 14,
    PODBG_REG_X86_SI = 15,
    PODBG_REG_X86_DI = 16,
    PODBG_REG_X86_EAX = 17,
    PODBG_REG_X86_ECX = 18,
    PODBG_REG_X86_EDX = 19,
    PODBG_REG_X86_EBX = 20,
    PODBG_REG_X86_ESP = 21,
    PODBG_REG_X86_EBP = 22,
    PODBG_REG_X86_ESI = 23,
    PODBG_REG_X86_EDI = 24,
    PODBG_REG_X86_ES = 25,
    PODBG_REG_X86_CS = 26,
    PODBG_REG_X86_SS = 27,
    PODBG_REG_X86_DS = 28,
    PODBG_REG_X86_FS = 29,
    PODBG_REG_X86_GS = 30,
    PODBG_REG_X86_IP = 31,
    PODBG_REG_X86_FLAGS = 32,
    PODBG_REG_X86_EIP = 33,
    PODBG_REG_X86_EFLAGS = 34,
    PODBG_REG_X86_CR0 = 80,
    PODBG_REG_X86_CR1 = 81,
    PODBG_REG_X86_CR2 = 82,
    PODBG_REG_X86_CR3 = 83,
    PODBG_REG_X86_DR0 = 90,
    PODBG_REG_X86_DR1 = 91,
    PODBG_REG_X86_DR2 = 92,
    PODBG_REG_X86_DR3 = 93,
    PODBG_REG_X86_DR4 = 94,
    PODBG_REG_X86_DR5 = 95,
    PODBG_REG_X86_DR6 = 96,
    PODBG_REG_X86_DR7 = 97,
    PODBG_REG_X86_ST0 = 128,
    PODBG_REG_X86_ST1 = 129,
    PODBG_REG_X86_ST2 = 130,
    PODBG_REG_X86_ST3 = 131,
    PODBG_REG_X86_ST4 = 132,
    PODBG_REG_X86_ST5 = 133,
    PODBG_REG_X86_ST6 = 134,
    PODBG_REG_X86_ST7 = 135,
    PODBG_REG_X86_CONTROL = 136,
    PODBG_REG_X86_STATUS = 137,
    PODBG_REG_X86_TAG = 138,
    PODBG_REG_X86_FPIP = 139,
    PODBG_REG_X86_FPCS = 140,
    PODBG_REG_X86_FPDO = 141,
    PODBG_REG_X86_FPDS = 142,
    PODBG_REG_X86_ISEM = 143,
    PODBG_REG_X86_FPEIP = 144,
    PODBG_REG_X86_FPEDO = 145,
    PODBG_REG_X86_MM0 = 146,
    PODBG_REG_X86_MM1 = 147,
    PODBG_REG_X86_MM2 = 148,
    PODBG_REG_X86_MM3 = 149,
    PODBG_REG_X86_MM4 = 150,
    PODBG_REG_X86_MM5 = 151,
    PODBG_REG_X86_MM6 = 152,
    PODBG_REG_X86_MM7 = 153,
    PODBG_REG_X86_XMM0 = 154,  /* KATMAI register */
    PODBG_REG_X86_XMM1 = 155,
    PODBG_REG_X86_XMM2 = 156,
    PODBG_REG_X86_XMM3 = 157,
    PODBG_REG_X86_XMM4 = 158,
    PODBG_REG_X86_XMM5 = 159,
    PODBG_REG_X86_XMM6 = 160,
    PODBG_REG_X86_XMM7 = 161,
    PODBG_REG_X86_XMM00 = 162,  /* KATMAI sub-register */
    PODBG_REG_X86_XMM01 = 163,
    PODBG_REG_X86_XMM02 = 164,
    PODBG_REG_X86_XMM03 = 165,
    PODBG_REG_X86_XMM10 = 166,
    PODBG_REG_X86_XMM11 = 167,
    PODBG_REG_X86_XMM12 = 168,
    PODBG_REG_X86_XMM13 = 169,
    PODBG_REG_X86_XMM20 = 170,
    PODBG_REG_X86_XMM21 = 171,
    PODBG_REG_X86_XMM22 = 172,
    PODBG_REG_X86_XMM23 = 173,
    PODBG_REG_X86_XMM30 = 174,
    PODBG_REG_X86_XMM31 = 175,
    PODBG_REG_X86_XMM32 = 176,
    PODBG_REG_X86_XMM33 = 177,
    PODBG_REG_X86_XMM40 = 178,
    PODBG_REG_X86_XMM41 = 179,
    PODBG_REG_X86_XMM42 = 180,
    PODBG_REG_X86_XMM43 = 181,
    PODBG_REG_X86_XMM50 = 182,
    PODBG_REG_X86_XMM51 = 183,
    PODBG_REG_X86_XMM52 = 184,
    PODBG_REG_X86_XMM53 = 185,
    PODBG_REG_X86_XMM60 = 186,
    PODBG_REG_X86_XMM61 = 187,
    PODBG_REG_X86_XMM62 = 188,
    PODBG_REG_X86_XMM63 = 189,
    PODBG_REG_X86_XMM70 = 190,
    PODBG_REG_X86_XMM71 = 191,
    PODBG_REG_X86_XMM72 = 192,
    PODBG_REG_X86_XMM73 = 193,
    PODBG_REG_X86_XMM0L = 194,
    PODBG_REG_X86_XMM1L = 195,
    PODBG_REG_X86_XMM2L = 196,
    PODBG_REG_X86_XMM3L = 197,
    PODBG_REG_X86_XMM4L = 198,
    PODBG_REG_X86_XMM5L = 199,
    PODBG_REG_X86_XMM6L = 200,
    PODBG_REG_X86_XMM7L = 201,
    PODBG_REG_X86_XMM0H = 202,
    PODBG_REG_X86_XMM1H = 203,
    PODBG_REG_X86_XMM2H = 204,
    PODBG_REG_X86_XMM3H = 205,
    PODBG_REG_X86_XMM4H = 206,
    PODBG_REG_X86_XMM5H = 207,
    PODBG_REG_X86_XMM6H = 208,
    PODBG_REG_X86_XMM7H = 209,
    PODBG_REG_X86_MXCSR = 211,
    PODBG_REG_X86_EDXEAX = 212,  /* EDX:EAX pair */
    PODBG_REG_X86_EBXECX = 254,  /* EBX:ECX pair */
    PODBG_REG_X86_EDIESI = 255,  /* EDI:ESI pair */
    PODBG_REG_X86_LAST = 255,

    /* X64 architecture */
    PODBG_REG_X64_NONE = 0,
    PODBG_REG_X64_FIRST = PODBG_REG_X86_AL,
    PODBG_REG_X64_AL = PODBG_REG_X86_AL,
    PODBG_REG_X64_CL = PODBG_REG_X86_CL,
    PODBG_REG_X64_DL = PODBG_REG_X86_DL,
    PODBG_REG_X64_BL = PODBG_REG_X86_BL,
    PODBG_REG_X64_AH = PODBG_REG_X86_AH,
    PODBG_REG_X64_CH = PODBG_REG_X86_CH,
    PODBG_REG_X64_DH = PODBG_REG_X86_DH,
    PODBG_REG_X64_BH = PODBG_REG_X86_BH,
    PODBG_REG_X64_DIL = PODBG_REG_X86_AH,  /* reused */
    PODBG_REG_X64_SIL = PODBG_REG_X86_BH,  /* reused */
    PODBG_REG_X64_BPL = PODBG_REG_X86_CH,  /* reused */
    PODBG_REG_X64_R8B = 1001,
    PODBG_REG_X64_R9B = 1002,
    PODBG_REG_X64_R10B = 1003,
    PODBG_REG_X64_R11B = 1004,
    PODBG_REG_X64_R12B = 1005,
    PODBG_REG_X64_R13B = 1006,
    PODBG_REG_X64_R14B = 1007,
    PODBG_REG_X64_R15B = 1008,
    PODBG_REG_X64_AX = PODBG_REG_X86_AX,
    PODBG_REG_X64_CX = PODBG_REG_X86_CX,
    PODBG_REG_X64_DX = PODBG_REG_X86_DX,
    PODBG_REG_X64_BX = PODBG_REG_X86_BX,
    PODBG_REG_X64_SP = PODBG_REG_X86_SP,
    PODBG_REG_X64_BP = PODBG_REG_X86_BP,
    PODBG_REG_X64_SI = PODBG_REG_X86_SI,
    PODBG_REG_X64_DI = PODBG_REG_X86_DI,
    PODBG_REG_X64_R8W = 1009,
    PODBG_REG_X64_R9W = 1010,
    PODBG_REG_X64_R10W = 1011,
    PODBG_REG_X64_R11W = 1012,
    PODBG_REG_X64_R12W = 1013,
    PODBG_REG_X64_R13W = 1014,
    PODBG_REG_X64_R14W = 1015,
    PODBG_REG_X64_R15W = 1016,
    PODBG_REG_X64_EAX = PODBG_REG_X86_EAX,
    PODBG_REG_X64_ECX = PODBG_REG_X86_ECX,
    PODBG_REG_X64_EDX = PODBG_REG_X86_EDX,
    PODBG_REG_X64_EBX = PODBG_REG_X86_EBX,
    PODBG_REG_X64_ESP = PODBG_REG_X86_ESP,
    PODBG_REG_X64_EBP = PODBG_REG_X86_EBP,
    PODBG_REG_X64_ESI = PODBG_REG_X86_ESI,
    PODBG_REG_X64_EDI = PODBG_REG_X86_EDI,
    PODBG_REG_X64_R8D = 1017,
    PODBG_REG_X64_R9D = 1018,
    PODBG_REG_X64_R10D = 1019,
    PODBG_REG_X64_R11D = 1020,
    PODBG_REG_X64_R12D = 1021,
    PODBG_REG_X64_R13D = 1022,
    PODBG_REG_X64_R14D = 1023,
    PODBG_REG_X64_R15D = 1024,
    PODBG_REG_X64_RAX = 1025,
    PODBG_REG_X64_RCX = 1026,
    PODBG_REG_X64_RDX = 1027,
    PODBG_REG_X64_RBX = 1028,
    PODBG_REG_X64_RSP = 1029,
    PODBG_REG_X64_RBP = 1030,
    PODBG_REG_X64_RSI = 1031,
    PODBG_REG_X64_RDI = 1032,
    PODBG_REG_X64_R8 = 1033,
    PODBG_REG_X64_R9 = 1034,
    PODBG_REG_X64_R10 = 1035,
    PODBG_REG_X64_R11 = 1036,
    PODBG_REG_X64_R12 = 1037,
    PODBG_REG_X64_R13 = 1038,
    PODBG_REG_X64_R14 = 1039,
    PODBG_REG_X64_R15 = 1040,
    PODBG_REG_X64_XMM0 = PODBG_REG_X86_XMM0,
    PODBG_REG_X64_XMM1 = PODBG_REG_X86_XMM1,
    PODBG_REG_X64_XMM2 = PODBG_REG_X86_XMM2,
    PODBG_REG_X64_XMM3 = PODBG_REG_X86_XMM3,
    PODBG_REG_X64_XMM4 = PODBG_REG_X86_XMM4,
    PODBG_REG_X64_XMM5 = PODBG_REG_X86_XMM5,
    PODBG_REG_X64_XMM6 = PODBG_REG_X86_XMM6,
    PODBG_REG_X64_XMM7 = PODBG_REG_X86_XMM7,
    PODBG_REG_X64_XMM8 = 1041,
    PODBG_REG_X64_XMM9 = 1042,
    PODBG_REG_X64_XMM10 = 1043,
    PODBG_REG_X64_XMM11 = 1044,
    PODBG_REG_X64_XMM12 = 1045,
    PODBG_REG_X64_XMM13 = 1046,
    PODBG_REG_X64_XMM14 = 1047,
    PODBG_REG_X64_XMM15 = 1048,
    PODBG_REG_X64_YMM0 = 1049,
    PODBG_REG_X64_YMM1 = 1050,
    PODBG_REG_X64_YMM2 = 1051,
    PODBG_REG_X64_YMM3 = 1052,
    PODBG_REG_X64_YMM4 = 1053,
    PODBG_REG_X64_YMM5 = 1054,
    PODBG_REG_X64_YMM6 = 1055,
    PODBG_REG_X64_YMM7 = 1056,
    PODBG_REG_X64_YMM8 = 1057,
    PODBG_REG_X64_YMM9 = 1058,
    PODBG_REG_X64_YMM10 = 1059,
    PODBG_REG_X64_YMM11 = 1060,
    PODBG_REG_X64_YMM12 = 1061,
    PODBG_REG_X64_YMM13 = 1062,
    PODBG_REG_X64_YMM14 = 1063,
    PODBG_REG_X64_YMM15 = 1064,
    PODBG_REG_X64_XMM16 = 1065,
    PODBG_REG_X64_XMM17 = 1066,
    PODBG_REG_X64_XMM18 = 1067,
    PODBG_REG_X64_XMM19 = 1068,
    PODBG_REG_X64_XMM20 = 1069,
    PODBG_REG_X64_XMM21 = 1070,
    PODBG_REG_X64_XMM22 = 1071,
    PODBG_REG_X64_XMM23 = 1072,
    PODBG_REG_X64_XMM24 = 1073,
    PODBG_REG_X64_XMM25 = 1074,
    PODBG_REG_X64_XMM26 = 1075,
    PODBG_REG_X64_XMM27 = 1076,
    PODBG_REG_X64_XMM28 = 1077,
    PODBG_REG_X64_XMM29 = 1078,
    PODBG_REG_X64_XMM30 = 1079,
    PODBG_REG_X64_XMM31 = 1080,
    PODBG_REG_X64_YMM16 = 1081,
    PODBG_REG_X64_YMM17 = 1082,
    PODBG_REG_X64_YMM18 = 1083,
    PODBG_REG_X64_YMM19 = 1084,
    PODBG_REG_X64_YMM20 = 1085,
    PODBG_REG_X64_YMM21 = 1086,
    PODBG_REG_X64_YMM22 = 1087,
    PODBG_REG_X64_YMM23 = 1088,
    PODBG_REG_X64_YMM24 = 1089,
    PODBG_REG_X64_YMM25 = 1090,
    PODBG_REG_X64_YMM26 = 1091,
    PODBG_REG_X64_YMM27 = 1092,
    PODBG_REG_X64_YMM28 = 1093,
    PODBG_REG_X64_YMM29 = 1094,
    PODBG_REG_X64_YMM30 = 1095,
    PODBG_REG_X64_YMM31 = 1096,
    PODBG_REG_X64_ZMM0 = 1097,
    PODBG_REG_X64_ZMM1 = 1098,
    PODBG_REG_X64_ZMM2 = 1099,
    PODBG_REG_X64_ZMM3 = 1100,
    PODBG_REG_X64_ZMM4 = 1101,
    PODBG_REG_X64_ZMM5 = 1102,
    PODBG_REG_X64_ZMM6 = 1103,
    PODBG_REG_X64_ZMM7 = 1104,
    PODBG_REG_X64_ZMM8 = 1105,
    PODBG_REG_X64_ZMM9 = 1106,
    PODBG_REG_X64_ZMM10 = 1107,
    PODBG_REG_X64_ZMM11 = 1108,
    PODBG_REG_X64_ZMM12 = 1109,
    PODBG_REG_X64_ZMM13 = 1110,
    PODBG_REG_X64_ZMM14 = 1111,
    PODBG_REG_X64_ZMM15 = 1112,
    PODBG_REG_X64_ZMM16 = 1113,
    PODBG_REG_X64_ZMM17 = 1114,
    PODBG_REG_X64_ZMM18 = 1115,
    PODBG_REG_X64_ZMM19 = 1116,
    PODBG_REG_X64_ZMM20 = 1117,
    PODBG_REG_X64_ZMM21 = 1118,
    PODBG_REG_X64_ZMM22 = 1119,
    PODBG_REG_X64_ZMM23 = 1120,
    PODBG_REG_X64_ZMM24 = 1121,
    PODBG_REG_X64_ZMM25 = 1122,
    PODBG_REG_X64_ZMM26 = 1123,
    PODBG_REG_X64_ZMM27 = 1124,
    PODBG_REG_X64_ZMM28 = 1125,
    PODBG_REG_X64_ZMM29 = 1126,
    PODBG_REG_X64_ZMM30 = 1127,
    PODBG_REG_X64_ZMM31 = 1128,
    PODBG_REG_X64_K0 = 1129,  /* whatever */
    PODBG_REG_X64_K1 = 1130,
    PODBG_REG_X64_K2 = 1131,
    PODBG_REG_X64_K3 = 1132,
    PODBG_REG_X64_K4 = 1133,
    PODBG_REG_X64_K5 = 1134,
    PODBG_REG_X64_K6 = 1135,
    PODBG_REG_X64_K7 = 1136,
    PODBG_REG_X64_LAST = 1136,
} PODBG_REG_T;

/* Calling convention enumeration */
typedef enum PODBG_CALL_T {
    PODBG_CALL_NONE = 0,        /* unknown, inline function, etc. */
    PODBG_CALL_C = 1,           /* cdecl */
    PODBG_CALL_FAST = 2,        /* fastcall */
    PODBG_CALL_STD = 3,         /* stdcall */
    PODBG_CALL_SYS = 4,         /* syscall */
    PODBG_CALL_VECT = 5,        /* vectorcall */
} PODBG_CALL_T;

/* Checksum types */
typedef enum PODBG_CHECKSUM_T {
    PODBG_CHECKSUM_NONE = 0,
    PODBG_CHECKSUM_MD5 = 1,
} PODBG_CHECKSUM_T;

/* PODBG_DBGDIR_ENTRY_T modnum */
#define PODBG_MODULE_NUMBER_NONE  0         /* no entry */

/* PODBG_SYM_FUNC_T flags */
#define PODBG_SYM_FUNC_FLAG_FPO             0x01    /* function has frame pointer omitted */
#define PODBG_SYM_FUNC_FLAG_RETNEVER        0x02    /* function never returns */
#define PODBG_SYM_FUNC_FLAG_NOINLINE        0x04    /* function marked as noinline */
#define PODBG_SYM_FUNC_FLAG_INTERRUPT       0x08    /* function performs return from interrupt */

/* PODBG_LEAF_MODIFIER_T flags */
#define PODBG_LEAF_MODIFIER_FLAG_CONST      0x0001  /* const qualifier */
#define PODBG_LEAF_MODIFIER_FLAG_VOLATILE   0x0002  /* volatile qualifier */
#define PODBG_LEAF_MODIFIER_FLAG_RESTRICT   0x0004  /* restrict qualifier */
#define PODBG_LEAF_MODIFIER_FLAG_ATOMIC     0x0008  /* atomic type */

/* PODBG_LEAF_POINTER_T flags */
#define PODBG_LEAF_POINTER_FLAG_CONST       0x0001  /* const qualifier */
#define PODBG_LEAF_POINTER_FLAG_VOLATILE    0x0002  /* volatile qualifier */
#define PODBG_LEAF_POINTER_FLAG_RESTRICT    0x0004  /* restrict qualifier */
#define PODBG_LEAF_POINTER_FLAG_ATOMIC      0x0008  /* atomic type */

/* PODBG_LEAF_STRUCT_T flags */
#define PODBG_LEAF_STRUCT_FLAG_FWDREF       0x0001  /* forward reference (incomplete defn) */

/*
 * Primitive type encoding:
 * 1  1
 * 1  098   7654  3210
 * r  pm    km    kd
 *
 * pm = pointer mode (PODBG_PTRMODE_T)
 * km = kind mode (PODBG_KINDMODE_T)
 * kd = kind (PODBG_KINDxxxx_T)
 * r  = reserved bit
 */
#define PODBG_PRIMITIVE_TYPE(kindmode,kind,ptrmode)  ((kind)|((kindmode)<<4)|((ptrmode)<<8))

typedef enum PODBG_PTRMODE_T {
    PODBG_PM_DIR = 0,                   /* mode is not a pointer */
    PODBG_PM_PTR = 1,                   /* mode is a pointer */
} PODBG_PTRMODE_T;

typedef enum PODBG_KINDMODE_T {
    PODBG_KM_SPECIAL = 0,               /* special type size values */
    PODBG_KM_SIGNED = 1,                /* signed integral size values */
    PODBG_KM_UNSIGNED = 2,              /* unsigned integral size values */
    PODBG_KM_BOOLEAN = 3,               /* boolean size values */
    PODBG_KM_REAL = 4,                  /* real number size values */
    PODBG_KM_COMPLEX = 5,               /* complex number size values [DEPRECATED] */
#pragma deprecated("PODBG_KM_COMPLEX")
    PODBG_KM_INTEGER = 7,               /* integral (int) values */
} PODBG_KINDMODE_T;

/* for PODBG_KM_SPECIAL: */
typedef enum PODBG_KINDSPEC_T {
    PODBG_KS_NOTYPE = 0,
    PODBG_KS_VOID = 1,
} PODBG_KINDSPEC_T;

/* for PODBG_KM_SIGNED/PODBG_KM_UNSIGNED/PODBG_KM_BOOLEAN: */
typedef enum PODBG_KINDBITS_T {
    PODBG_KB_BITS8 = 0,
    PODBG_KB_BITS16 = 1,
    PODBG_KB_BITS32 = 2,
    PODBG_KB_BITS64 = 3,
    PODBG_KB_BITS128 = 4,
} PODBG_KINDBITS_T;

/* for PODBG_KM_REAL/PODBG_KM_COMPLEX: */
typedef enum PODBG_KINDREAL_T {
    PODBG_KR_REAL32 = 0,
    PODBG_KR_REAL64 = 1,
    PODBG_KR_REAL80 = 2,
    PODBG_KR_REAL128 = 3,
} PODBG_KINDREAL_T;

/* for PODBG_KM_INTEGER: */
typedef enum PODBG_KINDINT_T {
    PODBG_KI_INT1 = 0,
    PODBG_KI_UINT1 = 1,
    PODBG_KI_INT2 = 2,
    PODBG_KI_UINT2 = 3,
    PODBG_KI_INT4 = 4,
    PODBG_KI_UINT4 = 5,
    PODBG_KI_INT8 = 6,
    PODBG_KI_UINT8 = 7,
    PODBG_KI_INT16 = 8,
    PODBG_KI_UINT16 = 9,
    PODBG_KI_WCHAR = 10,   /* wchar_t */
    PODBG_KI_CHAR16 = 11,  /* char16_t */
    PODBG_KI_CHAR32 = 12,  /* char32_t */
} PODBG_KINDINT_T;

/* Special types */
#define PODBG_TYPE_NOTYPE       PODBG_PRIMITIVE_TYPE(PODBG_KM_SPECIAL,PODBG_KS_NOTYPE,PODBG_PM_DIR)
#define PODBG_TYPE_VOID         PODBG_PRIMITIVE_TYPE(PODBG_KM_SPECIAL,PODBG_KS_VOID,PODBG_PM_DIR)
#define PODBG_TYPE_PVOID        PODBG_PRIMITIVE_TYPE(PODBG_KM_SPECIAL,PODBG_KS_VOID,PODBG_PM_PTR)


/* Character types (signed) */
#define PODBG_TYPE_CHAR         PODBG_PRIMITIVE_TYPE(PODBG_KM_SIGNED,PODBG_KB_BITS8,PODBG_PM_DIR)
#define PODBG_TYPE_PCHAR        PODBG_PRIMITIVE_TYPE(PODBG_KM_SIGNED,PODBG_KB_BITS8,PODBG_PM_PTR)

/* Character types (unsigned) */
#define PODBG_TYPE_UCHAR        PODBG_PRIMITIVE_TYPE(PODBG_KM_UNSIGNED,PODBG_KB_BITS8,PODBG_PM_DIR)
#define PODBG_TYPE_PUCHAR       PODBG_PRIMITIVE_TYPE(PODBG_KM_UNSIGNED,PODBG_KB_BITS8,PODBG_PM_PTR)

/* 16-bit short types (signed) */
#define PODBG_TYPE_SHORT        PODBG_PRIMITIVE_TYPE(PODBG_KM_SIGNED,PODBG_KB_BITS16,PODBG_PM_DIR)
#define PODBG_TYPE_PSHORT       PODBG_PRIMITIVE_TYPE(PODBG_KM_SIGNED,PODBG_KB_BITS16,PODBG_PM_PTR)

/* 16-bit short types (unsigned) */
#define PODBG_TYPE_USHORT       PODBG_PRIMITIVE_TYPE(PODBG_KM_UNSIGNED,PODBG_KB_BITS16,PODBG_PM_DIR)
#define PODBG_TYPE_PUSHORT      PODBG_PRIMITIVE_TYPE(PODBG_KM_UNSIGNED,PODBG_KB_BITS16,PODBG_PM_PTR)

/* 32-bit long types (signed) */
#define PODBG_TYPE_LONG         PODBG_PRIMITIVE_TYPE(PODBG_KM_SIGNED,PODBG_KB_BITS32,PODBG_PM_DIR)
#define PODBG_TYPE_PLONG        PODBG_PRIMITIVE_TYPE(PODBG_KM_SIGNED,PODBG_KB_BITS32,PODBG_PM_PTR)

/* 32-bit long types (unsigned) */
#define PODBG_TYPE_ULONG        PODBG_PRIMITIVE_TYPE(PODBG_KM_UNSIGNED,PODBG_KB_BITS32,PODBG_PM_DIR)
#define PODBG_TYPE_PULONG       PODBG_PRIMITIVE_TYPE(PODBG_KM_UNSIGNED,PODBG_KB_BITS32,PODBG_PM_PTR)

/* 64-bit long long types (signed) */
#define PODBG_TYPE_QUAD         PODBG_PRIMITIVE_TYPE(PODBG_KM_SIGNED,PODBG_KB_BITS64,PODBG_PM_DIR)
#define PODBG_TYPE_PQUAD        PODBG_PRIMITIVE_TYPE(PODBG_KM_SIGNED,PODBG_KB_BITS64,PODBG_PM_PTR)

/* 64-bit long long types (unsigned) */
#define PODBG_TYPE_UQUAD        PODBG_PRIMITIVE_TYPE(PODBG_KM_UNSIGNED,PODBG_KB_BITS64,PODBG_PM_DIR)
#define PODBG_TYPE_PUQUAD       PODBG_PRIMITIVE_TYPE(PODBG_KM_UNSIGNED,PODBG_KB_BITS64,PODBG_PM_PTR)

/* 128-bit octet types (signed) */
#define PODBG_TYPE_OCT          PODBG_PRIMITIVE_TYPE(PODBG_KM_SIGNED,PODBG_KB_BITS128,PODBG_PM_DIR)
#define PODBG_TYPE_POCT         PODBG_PRIMITIVE_TYPE(PODBG_KM_SIGNED,PODBG_KB_BITS128,PODBG_PM_PTR)

/* 128-bit octet types (unsigned) */
#define PODBG_TYPE_UOCT         PODBG_PRIMITIVE_TYPE(PODBG_KM_UNSIGNED,PODBG_KB_BITS128,PODBG_PM_DIR)
#define PODBG_TYPE_PUOCT        PODBG_PRIMITIVE_TYPE(PODBG_KM_UNSIGNED,PODBG_KB_BITS128,PODBG_PM_PTR)


/* Really a character types */
#define PODBG_TYPE_RCHAR        PODBG_PRIMITIVE_TYPE(PODBG_KM_INTEGER,PODBG_KI_INT1,PODBG_PM_DIR)
#define PODBG_TYPE_PRCHAR       PODBG_PRIMITIVE_TYPE(PODBG_KM_INTEGER,PODBG_KI_INT1,PODBG_PM_PTR)

/* Really a wide character types */
#define PODBG_TYPE_WCHAR        PODBG_PRIMITIVE_TYPE(PODBG_KM_INTEGER,PODBG_KI_WCHAR,PODBG_PM_DIR)
#define PODBG_TYPE_PWCHAR       PODBG_PRIMITIVE_TYPE(PODBG_KM_INTEGER,PODBG_KI_WCHAR,PODBG_PM_PTR)

/* Really a 16-bit Unicode character types */
#define PODBG_TYPE_CHAR16       PODBG_PRIMITIVE_TYPE(PODBG_KM_INTEGER,PODBG_KI_CHAR16,PODBG_PM_DIR)
#define PODBG_TYPE_PCHAR16      PODBG_PRIMITIVE_TYPE(PODBG_KM_INTEGER,PODBG_KI_CHAR16,PODBG_PM_PTR)

/* Really a 32-bit Unicode character types */
#define PODBG_TYPE_CHAR32       PODBG_PRIMITIVE_TYPE(PODBG_KM_INTEGER,PODBG_KI_CHAR32,PODBG_PM_DIR)
#define PODBG_TYPE_PCHAR32      PODBG_PRIMITIVE_TYPE(PODBG_KM_INTEGER,PODBG_KI_CHAR32,PODBG_PM_PTR)

/* 8-bit integer types (signed) */
#define PODBG_TYPE_INT1         PODBG_PRIMITIVE_TYPE(PODBG_KM_INTEGER,PODBG_KI_INT1,PODBG_PM_DIR)
#define PODBG_TYPE_PINT1        PODBG_PRIMITIVE_TYPE(PODBG_KM_INTEGER,PODBG_KI_INT1,PODBG_PM_PTR)

/* 8-bit integer types (unsigned) */
#define PODBG_TYPE_UINT1        PODBG_PRIMITIVE_TYPE(PODBG_KM_INTEGER,PODBG_KI_UINT1,PODBG_PM_DIR)
#define PODBG_TYPE_PUINT1       PODBG_PRIMITIVE_TYPE(PODBG_KM_INTEGER,PODBG_KI_UINT1,PODBG_PM_PTR)

/* 16-bit integer types (signed) */
#define PODBG_TYPE_INT2         PODBG_PRIMITIVE_TYPE(PODBG_KM_INTEGER,PODBG_KI_INT2,PODBG_PM_DIR)
#define PODBG_TYPE_PINT2        PODBG_PRIMITIVE_TYPE(PODBG_KM_INTEGER,PODBG_KI_INT2,PODBG_PM_PTR)

/* 16-bit integer types (unsigned) */
#define PODBG_TYPE_UINT2        PODBG_PRIMITIVE_TYPE(PODBG_KM_INTEGER,PODBG_KI_UINT2,PODBG_PM_DIR)
#define PODBG_TYPE_PUINT2       PODBG_PRIMITIVE_TYPE(PODBG_KM_INTEGER,PODBG_KI_UINT2,PODBG_PM_PTR)

/* 32-bit integer types (signed) */
#define PODBG_TYPE_INT4         PODBG_PRIMITIVE_TYPE(PODBG_KM_INTEGER,PODBG_KI_INT4,PODBG_PM_DIR)
#define PODBG_TYPE_PINT4        PODBG_PRIMITIVE_TYPE(PODBG_KM_INTEGER,PODBG_KI_INT4,PODBG_PM_PTR)

/* 32-bit integer types (unsigned) */
#define PODBG_TYPE_UINT4        PODBG_PRIMITIVE_TYPE(PODBG_KM_INTEGER,PODBG_KI_UINT4,PODBG_PM_DIR)
#define PODBG_TYPE_PUINT4       PODBG_PRIMITIVE_TYPE(PODBG_KM_INTEGER,PODBG_KI_UINT4,PODBG_PM_PTR)

/* 64-bit integer types (signed) */
#define PODBG_TYPE_INT8         PODBG_PRIMITIVE_TYPE(PODBG_KM_INTEGER,PODBG_KI_INT8,PODBG_PM_DIR)
#define PODBG_TYPE_PINT8        PODBG_PRIMITIVE_TYPE(PODBG_KM_INTEGER,PODBG_KI_INT8,PODBG_PM_PTR)

/* 64-bit integer types (unsigned) */
#define PODBG_TYPE_UINT8        PODBG_PRIMITIVE_TYPE(PODBG_KM_INTEGER,PODBG_KI_UINT8,PODBG_PM_DIR)
#define PODBG_TYPE_PUINT8       PODBG_PRIMITIVE_TYPE(PODBG_KM_INTEGER,PODBG_KI_UINT8,PODBG_PM_PTR)

/* 128-bit integer types (signed) */
#define PODBG_TYPE_INT16        PODBG_PRIMITIVE_TYPE(PODBG_KM_INTEGER,PODBG_KI_INT16,PODBG_PM_DIR)
#define PODBG_TYPE_PINT16       PODBG_PRIMITIVE_TYPE(PODBG_KM_INTEGER,PODBG_KI_INT16,PODBG_PM_PTR)

/* 128-bit integer types (unsigned) */
#define PODBG_TYPE_UINT16       PODBG_PRIMITIVE_TYPE(PODBG_KM_INTEGER,PODBG_KI_UINT16,PODBG_PM_DIR)
#define PODBG_TYPE_PUINT16      PODBG_PRIMITIVE_TYPE(PODBG_KM_INTEGER,PODBG_KI_UINT16,PODBG_PM_PTR)


/* 32-bit real types */
#define PODBG_TYPE_REAL32       PODBG_PRIMITIVE_TYPE(PODBG_KM_REAL,PODBG_KR_REAL32,PODBG_PM_DIR)
#define PODBG_TYPE_PREAL32      PODBG_PRIMITIVE_TYPE(PODBG_KM_REAL,PODBG_KR_REAL32,PODBG_PM_PTR)

/* 64-bit real types */
#define PODBG_TYPE_REAL64       PODBG_PRIMITIVE_TYPE(PODBG_KM_REAL,PODBG_KR_REAL64,PODBG_PM_DIR)
#define PODBG_TYPE_PREAL64      PODBG_PRIMITIVE_TYPE(PODBG_KM_REAL,PODBG_KR_REAL64,PODBG_PM_PTR)

/* 80-bit real types */
#define PODBG_TYPE_REAL80       PODBG_PRIMITIVE_TYPE(PODBG_KM_REAL,PODBG_KR_REAL80,PODBG_PM_DIR)
#define PODBG_TYPE_PREAL80      PODBG_PRIMITIVE_TYPE(PODBG_KM_REAL,PODBG_KR_REAL80,PODBG_PM_PTR)

/* 128-bit real types */
#define PODBG_TYPE_REAL128      PODBG_PRIMITIVE_TYPE(PODBG_KM_REAL,PODBG_KR_REAL128,PODBG_PM_DIR)
#define PODBG_TYPE_PREAL128     PODBG_PRIMITIVE_TYPE(PODBG_KM_REAL,PODBG_KR_REAL128,PODBG_PM_PTR)


/* 32-bit complex types [DEPRECATED] */
#define PODBG_TYPE_CPLX32       PODBG_PRIMITIVE_TYPE(PODBG_KM_COMPLEX,PODBG_KR_REAL32,PODBG_PM_DIR)
#define PODBG_TYPE_PCPLX32      PODBG_PRIMITIVE_TYPE(PODBG_KM_COMPLEX,PODBG_KR_REAL32,PODBG_PM_PTR)
#pragma deprecated("PODBG_TYPE_CPLX32","PODBG_TYPE_PCPLX32")

/* 64-bit complex types [DEPRECATED] */
#define PODBG_TYPE_CPLX64       PODBG_PRIMITIVE_TYPE(PODBG_KM_COMPLEX,PODBG_KR_REAL64,PODBG_PM_DIR)
#define PODBG_TYPE_PCPLX64      PODBG_PRIMITIVE_TYPE(PODBG_KM_COMPLEX,PODBG_KR_REAL64,PODBG_PM_PTR)
#pragma deprecated("PODBG_TYPE_CPLX64","PODBG_TYPE_PCPLX64")

/* 80-bit complex types [DEPRECATED] */
#define PODBG_TYPE_CPLX80       PODBG_PRIMITIVE_TYPE(PODBG_KM_COMPLEX,PODBG_KR_REAL80,PODBG_PM_DIR)
#define PODBG_TYPE_PCPLX80      PODBG_PRIMITIVE_TYPE(PODBG_KM_COMPLEX,PODBG_KR_REAL80,PODBG_PM_PTR)
#pragma deprecated("PODBG_TYPE_CPLX80","PODBG_TYPE_PCPLX80")

/* 128-bit complex types [DEPRECATED] */
#define PODBG_TYPE_CPLX128      PODBG_PRIMITIVE_TYPE(PODBG_KM_COMPLEX,PODBG_KR_REAL128,PODBG_PM_DIR)
#define PODBG_TYPE_PCPLX128     PODBG_PRIMITIVE_TYPE(PODBG_KM_COMPLEX,PODBG_KR_REAL128,PODBG_PM_PTR)
#pragma deprecated("PODBG_TYPE_CPLX128","PODBG_TYPE_PCPLX128")


/* Boolean types */
#define PODBG_TYPE_BOOL         PODBG_PRIMITIVE_TYPE(PODBG_KM_BOOLEAN,PODBG_KB_BITS8,PODBG_PM_DIR)
#define PODBG_TYPE_PBOOL        PODBG_PRIMITIVE_TYPE(PODBG_KM_BOOLEAN,PODBG_KB_BITS8,PODBG_PM_PTR)


/* Type classification macros */
#define PODBG_IS_COMPLEX_TYPE(t)            ((t) >= PODBG_TYPE_FIRST_NON_PRIMITIVE)
#define PODBG_IS_PRIMITIVE_TYPE(t)          ((t) <  PODBG_TYPE_FIRST_NON_PRIMITIVE)
#define PODBG_IS_PRIMITIVE_POINTER_TYPE(t)  (PODBG_IS_PRIMITIVE_TYPE(t) && ((t) & 0x0700) != 0)
#define PODBG_PRIMITIVE_POINTED_TO_TYPE(t)  /*((t) & ~0x0700)*/ ((t) & 0x00FF)


/* Debugger helpers */
#define PODBG_PRIMITIVE_TYPE_KINDMODE(t)  (((t) >> 4) & 0xF)
#define PODBG_PRIMITIVE_TYPE_KIND(t)  ((t) & 0xF)


/* First non-primitive type index (leaf) */
#define PODBG_TYPE_FIRST_NON_PRIMITIVE  0x1000  /* 1<<12 */

/*
 * No PODBG_LEAF_xxx index can have a value of 0x0000. The leaf indices are separated into
 * three groups according to the use of the type record. The first group is for the type records
 * that are directly referenced from symbols. The second group is for type records that are
 * not referenced from symbols, but instead are referenced from other type records. All type
 * records must have a starting leaf index in one of these two groups.
 *
 * The third group of leaf indices is used to build complex lists, such as the field list of
 * a structure record. No type record can begin with one of the leaf indices in this group.
 *
 * Because of the method used to maintain natural alignment in complex lists, no leaf index can
 * have a value greater than or equal to 0xf000. Also, no leaf index can have a value such that
 * the least significant 8 bits of the value is greater than or equal to 0xf0.
 */
typedef enum PODBG_LEAF_T {
    /*
     * Group 1: Leaf indices starting records referenced from symbol records.
     */
    PODBG_LEAF_MODIFIER = 0x1001,       /* type modifier */
    PODBG_LEAF_POINTER = 0x1002,        /* pointer */
    PODBG_LEAF_ARRAY = 0x1003,          /* simple array */
    PODBG_LEAF_VARARRAY = 0x1004,       /* variable-length array (VLA) */
    PODBG_LEAF_STRUCT = 0x1005,         /* structure */
    PODBG_LEAF_UNION = 0x1006,          /* union */
    PODBG_LEAF_ENUM = 0x1007,           /* enumeration */
    PODBG_LEAF_FUNCTION = 0x1008,       /* function */
    /*
     * Group 2: Leaf indices starting records only referenced from other type records.
     */
    PODBG_LEAF_PARMLIST = 0x1201,       /* parameter list */
    PODBG_LEAF_FIELDLIST = 0x1202,      /* field list */
    PODBG_LEAF_BITFIELD = 0x1203,       /* bit fields */
    PODBG_LEAF_REFSYM = 0x1204,         /* reference symbol */
    PODBG_LEAF_DIMCNST = 0x1205,        /* constant dimension (vararray) */
    /*
     * Group 3: Leaf indices for fields of complex lists.
     */
    PODBG_SUBLEAF_FIELD16 = 0x1401,     /* field list member (16-bit offset) */
    PODBG_SUBLEAF_FIELD32 = 0x1402,     /* field list member (32-bit offset) */
    PODBG_SUBLEAF_ENUM32 = 0x1403,      /* enumeration member (32-bit value) */
    /*
     * Paddington.
     */
    PODBG_LEAF_PAD0 = 0xF0,
    PODBG_LEAF_PAD1 = 0xF1,
    PODBG_LEAF_PAD2 = 0xF2,
    PODBG_LEAF_PAD3 = 0xF3,
    PODBG_LEAF_PAD4 = 0xF4,
    PODBG_LEAF_PAD5 = 0xF5,
    PODBG_LEAF_PAD6 = 0xF6,
    PODBG_LEAF_PAD7 = 0xF7,
    PODBG_LEAF_PAD8 = 0xF8,
    PODBG_LEAF_PAD9 = 0xF9,
    PODBG_LEAF_PAD10 = 0xFA,
    PODBG_LEAF_PAD11 = 0xFB,
    PODBG_LEAF_PAD12 = 0xFC,
    PODBG_LEAF_PAD13 = 0xFD,
    PODBG_LEAF_PAD14 = 0xFE,
    PODBG_LEAF_PAD15 = 0xFF,
} PODBG_LEAF_T;

#endif /* H_DBGCONST */
