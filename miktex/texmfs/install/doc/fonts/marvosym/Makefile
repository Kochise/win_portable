DOC=marvodoc
SYM=marvosym-doc

all: $(DOC).pdf $(SYM).pdf

$(DOC).pdf: $(DOC).tex
	pdflatex $<
	pdflatex $<

$(SYM).pdf: $(SYM).tex marvosym-table.tex
	pdflatex $<
	pdflatex $<

clean:
	-$(RM) $(DOC).log $(DOC).aux $(DOC).out $(SYM).log $(SYM).aux $(SYM).out

allclean: clean
	-$(RM) $(DOC).pdf $(SYM).pdf marvosym-table.tex

.PHONY: all clean allclean
