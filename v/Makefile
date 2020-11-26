CC ?= cc
CFLAGS ?=
LDFLAGS ?=
TMPDIR ?= /tmp
VC     ?= ./vc
V      := ./v

VCFILE := v.c
TMPTCC := /var/tmp/tcc
VCREPO := https://github.com/vlang/vc
TCCREPO := https://github.com/vlang/tccbin
GITCLEANPULL := git clean -xf && git pull --quiet
GITFASTCLONE := git clone --depth 1 --quiet

#### Platform detections and overrides:
_SYS := $(shell uname 2>/dev/null || echo Unknown)
_SYS := $(patsubst MSYS%,MSYS,$(_SYS))
_SYS := $(patsubst MINGW%,MinGW,$(_SYS))

ifneq ($(filter $(_SYS),MSYS MinGW),)
WIN32 := 1
V:=./v.exe
endif

ifeq ($(_SYS),Linux)
LINUX := 1
endif

ifeq ($(_SYS),Darwin)
MAC := 1
endif

ifeq ($(_SYS),FreeBSD)
LDFLAGS += -lexecinfo
endif

ifdef ANDROID_ROOT
ANDROID := 1
undefine LINUX
endif
#####

ifdef WIN32
TCCREPO := https://github.com/vlang/tccbin_win
VCFILE := v_win.c
endif

all: latest_vc latest_tcc
ifdef WIN32
	$(CC) $(CFLAGS) -g -std=c99 -municode -w -o $(V) $(VC)/$(VCFILE) $(LDFLAGS)
ifdef prod
	$(V) -prod self
else
	$(V) self
endif
else
	$(CC) $(CFLAGS) -g -std=gnu99 -w -o $(V) $(VC)/$(VCFILE) -lm -lpthread $(LDFLAGS) 
ifdef ANDROID
	chmod 755 v
endif

ifdef prod
	$(V) -prod self
else
	$(V) self
endif

ifndef ANDROID
	$(MAKE) modules
endif
endif
	@echo "V has been successfully built"
	@$(V) -version

#clean: clean_tmp
#git clean -xf

clean:
	rm -rf $(TMPTCC)
	rm -rf $(VC)

latest_vc: $(VC)/.git/config
ifndef local
	cd $(VC) && $(GITCLEANPULL)
else
	@echo "Using local vc"
endif

fresh_vc:
	$(GITFASTCLONE) $(VCREPO) $(VC)

latest_tcc: $(TMPTCC)/.git/config
ifndef ANDROID
ifndef MAC
ifndef local
	cd $(TMPTCC) && $(GITCLEANPULL)
else
	@echo "Using local tcc"
endif
endif
endif

fresh_tcc:
ifndef ANDROID
ifndef MAC
	rm -rf $(TMPTCC)
	$(GITFASTCLONE) $(TCCREPO) $(TMPTCC)
endif
endif

$(TMPTCC)/.git/config:
ifndef MAC
	$(MAKE) fresh_tcc
endif

$(VC)/.git/config:
	$(MAKE) fresh_vc

selfcompile:
	$(V) -cg -o v cmd/v

selfcompile-static:
	$(V) -cg -cflags '--static' -o v-static cmd/v

modules: module_builtin module_strings module_strconv
module_builtin:
	#$(V) build module vlib/builtin > /dev/null
module_strings:
	#$(V) build module vlib/strings > /dev/null
module_strconv:
	#$(V) build module vlib/strconv > /dev/null
