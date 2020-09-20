/**
 * This file has no copyright assigned and is placed in the Public Domain.
 * This file is part of the w64 mingw-runtime package.
 * No warranty is given; refer to the file DISCLAIMER within this package.
 */
#ifdef __cplusplus
extern "C"{
#endif

#include <rpc.h>
#include <rpcndr.h>

#ifdef _MIDL_USE_GUIDDEF_
#ifndef INITGUID
#define INITGUID
#include <guiddef.h>
#undef INITGUID
#else
#include <guiddef.h>
#endif

#define MIDL_DEFINE_GUID(type,name,l,w1,w2,b1,b2,b3,b4,b5,b6,b7,b8) DEFINE_GUID(name,l,w1,w2,b1,b2,b3,b4,b5,b6,b7,b8)
#else

#ifndef __IID_DEFINED__
#define __IID_DEFINED__
  typedef struct _IID {
    unsigned long x;
    unsigned short s1;
    unsigned short s2;
    unsigned char c[8];
  } IID;
#endif

#ifndef CLSID_DEFINED
#define CLSID_DEFINED
  typedef IID CLSID;
#endif

#define MIDL_DEFINE_GUID(type,name,l,w1,w2,b1,b2,b3,b4,b5,b6,b7,b8) const type name = {l,w1,w2,{b1,b2,b3,b4,b5,b6,b7,b8}}
#endif

  MIDL_DEFINE_GUID(IID,IID_IByteBuffer,0xE126F8FE,0xA7AF,0x11D0,0xB8,0x8A,0x00,0xC0,0x4F,0xD4,0x24,0xB9);
  MIDL_DEFINE_GUID(IID,IID_ISCardTypeConv,0x53B6AA63,0x3F56,0x11D0,0x91,0x6B,0x00,0xAA,0x00,0xC1,0x80,0x68);
  MIDL_DEFINE_GUID(IID,IID_ISCardCmd,0xD5778AE3,0x43DE,0x11D0,0x91,0x71,0x00,0xAA,0x00,0xC1,0x80,0x68);
  MIDL_DEFINE_GUID(IID,IID_ISCardISO7816,0x53B6AA68,0x3F56,0x11D0,0x91,0x6B,0x00,0xAA,0x00,0xC1,0x80,0x68);
  MIDL_DEFINE_GUID(IID,IID_ISCard,0x1461AAC3,0x6810,0x11D0,0x91,0x8F,0x00,0xAA,0x00,0xC1,0x80,0x68);
  MIDL_DEFINE_GUID(IID,IID_ISCardDatabase,0x1461AAC8,0x6810,0x11D0,0x91,0x8F,0x00,0xAA,0x00,0xC1,0x80,0x68);
  MIDL_DEFINE_GUID(IID,IID_ISCardLocate,0x1461AACD,0x6810,0x11D0,0x91,0x8F,0x00,0xAA,0x00,0xC1,0x80,0x68);
  MIDL_DEFINE_GUID(IID,LIBID_SCARDSSPLib,0x82C38704,0x19F1,0x11D3,0xA1,0x1F,0x00,0xC0,0x4F,0x79,0xF8,0x00);
  MIDL_DEFINE_GUID(CLSID,CLSID_CByteBuffer,0xE126F8FF,0xA7AF,0x11D0,0xB8,0x8A,0x00,0xC0,0x4F,0xD4,0x24,0xB9);
  MIDL_DEFINE_GUID(CLSID,CLSID_CSCardTypeConv,0x53B6AA67,0x3F56,0x11D0,0x91,0x6B,0x00,0xAA,0x00,0xC1,0x80,0x68);
  MIDL_DEFINE_GUID(CLSID,CLSID_CSCardCmd,0xD5778AE7,0x43DE,0x11D0,0x91,0x71,0x00,0xAA,0x00,0xC1,0x80,0x68);
  MIDL_DEFINE_GUID(CLSID,CLSID_CSCardISO7816,0x53B6AA6C,0x3F56,0x11D0,0x91,0x6B,0x00,0xAA,0x00,0xC1,0x80,0x68);
  MIDL_DEFINE_GUID(CLSID,CLSID_CSCard,0x1461AAC7,0x6810,0x11D0,0x91,0x8F,0x00,0xAA,0x00,0xC1,0x80,0x68);
  MIDL_DEFINE_GUID(CLSID,CLSID_CSCardDatabase,0x1461AACC,0x6810,0x11D0,0x91,0x8F,0x00,0xAA,0x00,0xC1,0x80,0x68);
  MIDL_DEFINE_GUID(CLSID,CLSID_CSCardLocate,0x1461AAD1,0x6810,0x11D0,0x91,0x8F,0x00,0xAA,0x00,0xC1,0x80,0x68);

#undef MIDL_DEFINE_GUID

#ifdef __cplusplus
}
#endif
