#ifndef __UNPACK_H__
#define __UNPACK_H__

// function supplying memory allocation 
// parameters : 
//		DWORD length in BYTE
typedef	void * (__stdcall *pfnMemoryAllocator)(DWORD);

// function sending information to main program
// parameters : 
//		DWORD : plugin index ( PGIParamsBlock.dwInterface)
//		DWORD : don't know
//		LPCTSTR : information string 
typedef	void (__stdcall *pfnPGICallBack)(DWORD, DWORD, LPCTSTR);

typedef struct tagPGIParamsBlock
{
	pfnMemoryAllocator pMemAllocator;	// function pointer supplying memory allocation
	pfnPGICallBack pCallBack;			// function pointer to callback function 
	LPVOID pInBuff;						// pointer to input buffer ( address of image in memory )
	LPVOID pOutBuff;					// pointer to output buffer filled by plugin ( address of decompressed image in memory )
	DWORD dwInSize;						// size in bytes of input buffer
	DWORD dwOutSize;					// size in bytes of output buffer set by plugin
	DWORD dwInterface;					// read only interface ID
	DWORD dwIndex;						// read only plugin index
}
PGIParamsBlock, *PPGIParamsBlock;

typedef void (__stdcall *pRegisterPlugIn)( LPCTSTR * );
typedef void (__stdcall *pAboutPlugIn) (void);
typedef BOOL (__stdcall *pPreloadImage)(PPGIParamsBlock);


void __stdcall PexRegisterPlugIn(LPCTSTR *);
void __stdcall PexAboutPlugIn(void);
BOOL __stdcall PexPreloadImage(PPGIParamsBlock);

#endif
