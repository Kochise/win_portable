/****************************************************************************
 *                                                                          *
 * File    : wizard.h                                                       *
 *                                                                          *
 * Purpose : Definitions for Pelles C Wizard API 1.x.                       *
 *                                                                          *
 * History : Date      Reason                                               *
 *           02-04-18  Created                                              *
 *           03-11-23  Added support for Smartphone devices.                *
 *           06-09-10  Added support for Win32 and WinCE installers.        *
 *           07-11-17  Added support for Win64 (64-bit Edition).            *
 *           12-12-13  Removed support for WinCE.                           *
 *           14-02-07  Added interface function WizScanForDependencies().   *
 *           18-05-25  Added interface functions WizGetProjectModeW(),      *
 *                     WizSetProjectModeW() and WizAddProjectModeW().       *
 *           20-05-09  Removed previously deprecated ANSI (A) stuff.        *
 *                                                                          *
 ****************************************************************************/

#ifndef _WIZARD_H
#define _WIZARD_H

#if defined(_IDE_)
#define WIZAPI __declspec(dllexport)
#else /* !_IDE_ */
#define WIZAPI __declspec(dllimport)
#pragma comment(lib, "wizard64.lib")
#endif /* !_IDE_ */

/* Project types */
enum WizProjType {
    Project_Win32_GUI = 0,
    Project_Win32_DLL = 1,
    Project_Win32_Library = 2,
    Project_Win32_Console = 3,
    Project_Win64_GUI = 10,
    Project_Win64_DLL = 11,
    Project_Win64_Library = 12,
    Project_Win64_Console = 13,
    Project_Win32_Installer = 50,
};

/* Step page notifications */
enum WizAction {
    Action_SetActive = 1,
    Action_KillActive = 2,
    Action_UpdateUI = 3
};

/* Step page callback procedure */
typedef BOOL (CALLBACK *WIZSTEPPROC)(HWND, enum WizAction);

/* Write file callback procedure */
typedef void (CALLBACK *WIZFILEPROCW)(PWSTR, int);

/* File dependency callback procedure */
typedef BOOL (CALLBACK *WIZDEPSPROCW)(const WCHAR *, void *);

/****** Function prototypes ************************************************/

BOOL WINAPI WizAddStepW(const WCHAR *, WIZSTEPPROC);
HINSTANCE WINAPI WizGetInstanceHandle(void);
BOOL WINAPI WizMain(void);
BOOL WINAPI WizShowSteps(void);
BOOL WINAPI WizWriteFileFromResourceW(const WCHAR *, const WCHAR *);
BOOL WINAPI WizWriteTextFileFromResourceW(const WCHAR *, const WCHAR *, WIZFILEPROCW);

WIZAPI BOOL WINAPI WizAddProjectFileW(const WCHAR *);
WIZAPI BOOL WINAPI WizAddProjectModeW(const WCHAR *);
WIZAPI BOOL WINAPI WizGetProjectModeW(WCHAR *, int);
WIZAPI BOOL WINAPI WizSetProjectModeW(const WCHAR *);
WIZAPI BOOL WINAPI WizGetProjectNameW(WCHAR *, int);
WIZAPI BOOL WINAPI WizGetProjectSymbolW(const WCHAR *, WCHAR *, int);
WIZAPI BOOL WINAPI WizSetProjectSymbolW(const WCHAR *, const WCHAR *);
WIZAPI BOOL WINAPI WizSetProjectType(enum WizProjType);
WIZAPI void WINAPI WizScanForDependenciesW(const WCHAR *, WIZDEPSPROCW, void *);

#ifdef UNICODE
#define WizAddStep  WizAddStepW
#define WizAddProjectFile  WizAddProjectFileW
#define WizAddProjectMode  WizAddProjectModeW
#define WizGetProjectMode  WizGetProjectModeW
#define WizSetProjectMode  WizSetProjectModeW
#define WizGetProjectName  WizGetProjectNameW
#define WizGetProjectSymbol  WizGetProjectSymbolW
#define WizSetProjectSymbol  WizSetProjectSymbolW
#define WizWriteFileFromResource WizWriteFileFromResourceW
#define WizWriteTextFileFromResource WizWriteTextFileFromResourceW
#define WizScanForDependencies WizScanForDependenciesW
typedef WIZFILEPROCW WIZFILEPROC;
typedef WIZDEPSPROCW WIZDEPSPROC;
#endif /* UNICODE */

#endif /* _WIZARD_H */
