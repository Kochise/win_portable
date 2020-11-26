import regex

/******************************************************************************
*
* Test section
*
******************************************************************************/
struct TestItem {
	src string
	q string
	s int
	e int
}

const(
match_test_suite = [

	// positive
	TestItem{"this is a good.",r"this",0,4},
	TestItem{"this is a good.",r"good",10,14},
	TestItem{"this is a good.",r"go+d",10,14},
	TestItem{"this is a good.",r"g[oae]+d",10,14},
	TestItem{"this is a goed.",r"g[oae]+d",10,14},
	TestItem{"this is a good.",r"g[oae]*d",10,14},
	TestItem{"this is a goaezd.",r"g[ea-cm-z]*d",10,16},
	TestItem{"this is a good.",r"this (\w+) a",0,9},
	TestItem{"this is a good.",r"this( \w+){2} g",0,11},
	TestItem{"this is a good.",r"( ?\w+){,1}",0,4},
	TestItem{"this is a good.",r"( ?\w+)+",0,14},
	TestItem{"this is a good.",r"this( \w+)+",0,14},
	TestItem{"this is a good sample.",r"( ?\w+){,2}",0,7},
	TestItem{"this is a good sample.",r"( ?\w+){,3}",0,9},
	TestItem{"this is a good sample.",r"( ?\w+){,4}",0,14},
	TestItem{"this is a good sample.",r"( ?\w+){,5}",0,21},
	TestItem{"this is a good sample.",r"( ?\w+){2,3}",0,9},
	TestItem{"this is a good sample.",r"(\s?\w+){2,3}",0,9},
	TestItem{"this these those.",r"(th[ei]se?\s|\.)+",0,11},
	TestItem{"this these those ",r"(th[eio]se? ?)+",0,17},
	TestItem{"this these those ",r"(th[eio]se? )+",0,17},
	TestItem{"this,these,those. over",r"(th[eio]se?[,. ])+",0,17},
	TestItem{"soday,this,these,those. over",r"(th[eio]se?[,. ])+",6,23},

	TestItem{"cpapaz",r"(c(pa)+z)",0,6},
	TestItem{"this is a cpapaz over",r"(c(pa)+z)",10,16},
	TestItem{"this is a cpapapez over",r"(c(p[ae])+z)",10,18},
	TestItem{"test@post.pip.com",r"[a-z0-9_]+@([a-z0-9_]+\.?)+",0,17},
	TestItem{"test1@post.pip.com, pera",r"[\w]+@([\w]+\.)+\w+",0,18},
	TestItem{"pippo@pera.com ",r"[a-z0-9_]+@([a-z0-9_]+\.?)+",0,14},
	TestItem{"adce aabe",r"(a(ab)+)|(a(dc)+)e",0,4},
	TestItem{"zadce aabe",r"(a(ab)+)|(a(dc)+)e",1,5},
	TestItem{"abbz accz addz.",r"c|(d)|e|(ab+)",0,3},
	TestItem{"this those these ciao",r"((t[hieo]+se?)\s*)+",0,17},
	TestItem{"this ciao",r"((t[hieo]+se?)\s*)+",0,5},
	TestItem{"this cpapaz adce aabe",r"(c(pa)+z)(\s[\a]+){2}",5,21},
	TestItem{"1234this cpapaz adce aabe",r"(c(pa)+z)(\s[\a]+){2}$",9,25},
	TestItem{"this cpapaz adce aabe third",r"(c(pa)+z)(\s[\a]+){2}",5,21},
	TestItem{"123cpapaz ole. pippo",r"(c(pa)+z)(\s+\a+[\.,]?)+",3,20},

	TestItem{"this is a good sample.",r".*i(\w)+",0,4},
	TestItem{"soday,this,these,those. over",r".*,(th[eio]se?[,. ])+",0,23},
	TestItem{"soday,this,these,thesa.thesi over",r".*,(th[ei]se?[,. ])+(thes[ai][,. ])+",0,29},
	TestItem{"cpapaz ole. pippo,",r".*(c(pa)+z)(\s+\a+[\.,]?)+",0,18},
	TestItem{"cpapaz ole. pippo",r".*(c(pa)+z)(\s+\a+[\.,]?)+",0,17},
	TestItem{"cpapaz ole. pippo, 852",r".*(c(pa)+z)(\s+\a+[\.,]?)+",0,18},
	TestItem{"123cpapaz ole. pippo",r".*(c(pa)+z)(\s+\a+[\.,]?)+",0,20},
	TestItem{"...cpapaz ole. pippo",r".*(c(pa)+z)(\s+\a+[\.,]?)+",0,20},

	TestItem{"cpapaz ole. pippo,",r".*c.+ole.*pi",0,14},
	TestItem{"cpapaz ole. pipipo,",r".*c.+ole.*p([ip])+o",0,18},
	TestItem{"cpapaz ole. pipipo",r"^.*c.+ol?e.*p([ip])+o$",0,18},
	TestItem{"abbb",r"ab{2,3}?",0,3},
	TestItem{" pippo pera",r"\s(.*)pe(.*)",0,11},
	TestItem{" abb",r"\s(.*)",0,4},

	TestItem{"/home/us_er/pippo/info-01.txt", r"(/?[-\w_]+)*\.txt$",0,29}


	// negative
	TestItem{"zthis ciao",r"((t[hieo]+se?)\s*)+",-1,0},
	TestItem{"this is a good.",r"thes",-1,0},
	TestItem{"test1post.pip.com, pera",r"[\w]+@([\w]+\.)+\w+",-1,0},
	TestItem{"this cpapaz adce",r"(c(pa)+z)(\s[\a]+){2}",-1,0},
	TestItem{"this cpapaz adce aabe third",r"(c(pa)+z)(\s[\a]+){2}$",-1,0},
	TestItem{"1234this cpapaz adce aabe ter",r"(c(pa)+z)(\s[\a]+){2}$",-1,0},
	TestItem{"cpapaz ole. pipipo,",r"^.*c.+ol?e.*p([ip])+o$",-1,0},
	TestItem{"/home/us_er/pippo/info-01.jpeg", r"(/?[-\w_]+)*\.txt$",-1,0}

	// check unicode
	TestItem{"this is a Ⅰ Ⅱ Ⅲ Ⅳ Ⅴ Ⅵ test",r".*a [Ⅰ-Ⅵ ]+",0,34},
	TestItem{"123Ⅰ Ⅱ Ⅲ Ⅳ Ⅴ Ⅵ test",r"[Ⅰ-Ⅴ\s]+",3,23},
]
)

struct TestItemFa {
	src string
	q string
	r []int
}

const (
match_test_suite_fa = [
	// find_all tests
	TestItemFa{
		"oggi pippo è andato a casa di pluto ed ha trovato pippo",
		r"p[iplut]+o",
		[5, 10, 31, 36, 51, 56]
	},
	TestItemFa{
		"oggi pibao è andato a casa di pbababao ed ha trovato pibabababao",
		r"(pi?(ba)+o)",
		[5, 10, 31, 39, 54, 65]
	},

]
)

struct TestItemRe {
	src string
	q string
	rep string
	r string
}
const (
match_test_suite_re = [
	// replace tests
	TestItemRe{
		"oggi pibao è andato a casa di pbababao ed ha trovato pibabababao",
		r"(pi?(ba)+o)",
		"CIAO",
		"oggi CIAO è andato a casa di CIAO ed ha trovato CIAO"
	},
	TestItemRe{
		"Today is a good day and tomorrow will be for sure.",
		r"[Tt]o\w+",
		"CIAO",
		"CIAO is a good day and CIAO will be for sure."
	}
]
)

struct TestItemCGroup {
	src string
	q string
	s int
	e int
	cg []int
	cgn map[string]int
}
const (
cgroups_test_suite = [
	TestItemCGroup{
		"http://www.ciao.mondo/hello/pippo12_/pera.html",
		r"(?P<format>https?)|(?:ftps?)://(?P<token>[\w_]+.)+",0,46,
		[8, 0, 0, 4, 1, 7, 11, 1, 11, 16, 1, 16, 22, 1, 22, 28, 1, 28, 37, 1, 37, 42, 1, 42, 46],
		{'format':int(0),'token':1}
	},
	TestItemCGroup{
		"http://www.ciao.mondo/hello/pippo12_/pera.html",
		r"(?P<format>https?)|(?P<format>ftps?)://(?P<token>[\w_]+.)+",0,46,
		[8, 0, 0, 4, 1, 7, 11, 1, 11, 16, 1, 16, 22, 1, 22, 28, 1, 28, 37, 1, 37, 42, 1, 42, 46],
		{'format':int(0),'token':1}
	},
	TestItemCGroup{
		"http://www.ciao.mondo/hello/pippo12_/pera.html",
		r"(?P<format>https?)|(?P<format>ftps?)://([\w_]+.)+",0,46,
		[8, 0, 0, 4, 1, 7, 11, 1, 11, 16, 1, 16, 22, 1, 22, 28, 1, 28, 37, 1, 37, 42, 1, 42, 46],
		{'format':int(0)}
	},
]
)

fn test_regex(){
	// check capturing groups
	for c,to in cgroups_test_suite {
		// debug print
		//println("#$c [$to.src] q[$to.q] ($to.s, $to.e)")

		mut re := regex.regex_opt(to.q) or {
			eprintln('err: $err')
			assert false
			continue
		}

		re.group_csave = [-1].repeat(3*20+1)

		start, end := re.match_string(to.src)

		mut tmp_str := ""
		if start >= 0 && end  > start{
			tmp_str = to.src[start..end]
		}

		if start != to.s || end != to.e {
			println("#$c [$to.src] q[$to.q] res[$tmp_str] $start, $end")
			println("ERROR!")
			//C.printf("ERROR!! res:(%d, %d) refh:(%d, %d)\n",start, end, to.s, to.e)
			assert false
			continue
		}

		// check cgroups
		if re.group_csave.len == 0 || re.group_csave[0] != to.cg[0] {
			println("Capturing group len error!")
			assert false
			continue
		}

		// check captured groups
		mut ln := re.group_csave[0]*3
		for ln > 0 {
			if re.group_csave[ln] != to.cg[ln] {
				assert false
			}
			ln--
		}

		// check named captured groups
		for k in to.cgn.keys() {
			if to.cgn[k] != (re.group_map[k]-1) { // we have -1 because the map not found is 0, in groups we start from 0 and we store using +1
				println("Named capturing group error! [$k]")
				assert false
				continue
			}
		}
	}

	// check find_all
	for _,to in match_test_suite_fa{
		// debug print
		//println("#$c [$to.src] q[$to.q] $to.r")

		mut re := regex.regex_opt(to.q) or {
			eprintln('err: $err')
			assert false
			continue
		}

		res := re.find_all(to.src)
		if res.len != to.r.len {
			println("ERROR: find_all, array of different size.")
			assert false
			continue
		}

		for c1,i in res {
			if i != to.r[c1] {
				println("ERROR: find_all, different indexes.")
				assert false
				continue
			}
		}

	}

	// check replace
	for _,to in match_test_suite_re{
		// debug print
		//println("#$c [$to.src] q[$to.q] $to.r")

		mut re := regex.regex_opt(to.q) or {
			eprintln('err: $err')
			assert false
			continue
		}

		res := re.replace(to.src,to.rep)
		if res != to.r {
			println("ERROR: replace.")
			assert false
			continue
		}
	}

	// check match and find
	for c,to in match_test_suite {
		// debug print
		println("#$c [$to.src] q[$to.q] $to.s $to.e")

		// test the find
		if to.s > 0 {
			mut re := regex.regex_opt(to.q) or {
				eprintln('err: $err')
				assert false
				continue
			}
			// q_str := re.get_query()
			// println("Query: $q_str")
			start,end := re.find(to.src)

			if start != to.s || end != to.e {
				err_str := re.get_parse_error_string(start)
				println("ERROR : $err_str")
				assert false
			} else {
				//tmp_str := text[start..end]
				//println("found in [$start, $end] => [$tmp_str]")
				assert true
			}
			continue
		}

		// test the match
		mut re := regex.new()
		//re.debug = true

		re.compile_opt(to.q) or {
			eprintln('err: $err')
			assert false
			continue
		}
		//println("#$c [$to.src] q[$to.q]")
		start, end := re.match_string(to.src)

		mut tmp_str := ""
		if start >= 0 && end  > start{
			tmp_str = to.src[start..end]
		}

		if start != to.s || end != to.e {
			println("#$c [$to.src] q[$to.q] res[$tmp_str] $start, $end")
			println("ERROR!")
			//C.printf("ERROR!! res:(%d, %d) refh:(%d, %d)\n",start, end, to.s, to.e)
			assert false
			continue
		}

		// rerun to test consistency
		tmp_str1 := to.src.clone()
		start1, end1 := re.match_string(tmp_str1)
		if start1 != start || end1 != end {
			println("two run ERROR!!")
			assert false
			continue
		}

	}
}
