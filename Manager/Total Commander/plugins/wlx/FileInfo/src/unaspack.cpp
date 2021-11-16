#include "stdafx.h"
#include "unpack.h"

#define PINAME "Aspack Unpacker PlugIn"
#define PIABV "<APK>"

#define MakePtr( cast, ptr, addValue ) (cast)( (DWORD)(ptr) + (DWORD)(addValue))

// return string using by the main program
// __declspec(dllexport)
void __stdcall PexRegisterPlugIn(LPCTSTR *str)
{
   *str = PINAME;
}

// display about box ( eventually options )
// __declspec(dllexport)
void __stdcall PexAboutPlugIn(void)
{
	MessageBox(NULL, "Aspack Unpacker PlugIn\nVersion 0.1\n\nGANNIER F.", "UnAspack About", MB_ICONINFORMATION | MB_OK);
}

LPVOID GetSectionPtr(PIMAGE_NT_HEADERS pNTHeader, DWORD imageBase)
{
    PIMAGE_SECTION_HEADER section = IMAGE_FIRST_SECTION(pNTHeader);
    for ( int i=0; i < pNTHeader->FileHeader.NumberOfSections-2; i++, section++ ) {}
    return (LPVOID)(section->PointerToRawData + imageBase);
}

// Main function 
// see description of PPGIParamsBlock in unpack.h
// return TRUE if this pluging can handle the source
// __declspec(dllexport)
BOOL __stdcall PexPreloadImage(PPGIParamsBlock pPGI)
{
	CString str;	
	DWORD id = pPGI->dwInterface;
	PDWORD base = (DWORD *) pPGI->pInBuff;
	
	(pPGI->pCallBack)(id, 0, "Executing...");
	
	PIMAGE_DOS_HEADER pDosHdr = (PIMAGE_DOS_HEADER) base;
    PIMAGE_NT_HEADERS pSecondHdr = MakePtr( PIMAGE_NT_HEADERS, base, pDosHdr->e_lfanew );
	PBYTE NTbase = (PBYTE) GetSectionPtr( pSecondHdr, (DWORD) base);
	
	if ( NTbase > ((PBYTE) base + pPGI->dwInSize)) 
	{
//		str.Format("%s: Error in EXE file", PIABV);
//		(pPGI->pCallBack)(id, 0, str);  // 
		return FALSE;
	}
	if (NTbase)
	{ // NTbase + 24
		if (*(NTbase + 2) == 0xE9)
			str.Format("%s: File compressed with Aspack ver 2.11", PIABV);
		else if (*(PWORD)(NTbase + 0x3B2) == 0x01B8)
			str.Format("%s: File compressed with Aspack ver 2.12/2.12a/2.12b", PIABV);
		else if (*(PWORD)(NTbase + 0x3B3) == 0x01B8)
			str.Format("%s: File compressed with Aspack ver ??", PIABV);
		else if (*(PWORD)(NTbase + 0x4F4) == 0x01B8)
			str.Format("%s: File compressed with Aspack 2000", PIABV);
		else if (*(PWORD)(NTbase + 0x4F6) == 0x01B8)
			str.Format("%s: File compressed with Aspack 2001", PIABV);
		else if (*(PWORD)(NTbase + 0x4F6) == 0x01B8 && *(NTbase + 0x4DF) == 0x000443A02)
			str.Format("%s: File compressed with Aspack ver 2.1", PIABV);
		else if (*(PWORD)(NTbase + 0x4F6) == 0x01B8 && *(NTbase + 0x4DF) == 0x0004439FD)
			str.Format("%s: File compressed with Aspack ver ??", PIABV);
		else if (*(PWORD)(NTbase + 0x3BA) == 0x7561)
			str.Format("%s: File compressed with Aspack ver ??", PIABV);
		else if (*(NTbase + 2) == 0xE8)
			str.Format("%s: File compressed with Aspack ver 2.11c/d", PIABV);
		else return FALSE;
	} else return FALSE;
	(pPGI->pCallBack)(id, 0, str);  // 

	//void *p = (pPGI->pMemAllocator)(DWORD len);	// Memory allocator for the returned Image
	// if (p) pPGI->pOutBuff = (LPVOID) p;			// Initialize output buffer pointer
	// pPGI->dwOutSize = len;						// Set output buffer size
	return TRUE;

}