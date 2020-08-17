Virtual Disk, Version 1.30 Final

Disk imajlarýný sistemde ek  sanal sürücü þeklinde yüklemeyi saðlayan
Total Commander için FS (dosya sistemi) eklentisi.

Ekleni Yazarý: Konstantin Vlasov, 2009
Anasayfa: http://flint-inc.ru/
E-posta: support@flint_inc.ru

Sürücü, Bo Branten'in 2004  tarihli açýk kaynaklý FileDisk projesi  tabanlýdýr.
Anasayfa: http://www.acc.umu.se/~bosse/
E-posta:   bosse@acc.umu.se


Taným
----------

Bu eklenti, disk imajlarýný ek sürücüler gibi yüklenmesini saðlar. Sadece
Windows 2000 ve Windows XP/2003 32/64-bit ile çalýþýr.
Ýmaj yüklendiðinde, sistemde yeni sürücü oluþur. Sürücü harfi, daha önce
belirlenmiþtir. Yeni sürücü imaj dosyasýnýn bütün içeriðini barýndýrýr.

Üç mod mevcuttur:
	1. HDD -  yerel sabit disk sürücü emülasyonu. Bu modda, FAT veya NTFS sistemiyle
		formatlanan sabit  sürücü bölümlerine ait imaj yüklenebilir.  Yine FAT dosya
		sistemine sahip flash sürücüler ve disketlerin imajlarý da bu modda kullanýlabilir.
	2. FDD - disket sürücü emülasyonu. Bu mod, NTFS bölümü dýþýnda HDD modundaki
		bütün imajlarýn yüklenmesini saðlar (Windows  disketler üzerinde NTFS
		kullanýlmasýna izin vermez).
	3. CD/DVD - CD sürücü emülasyonu (sistem açýsýndan CD ve DVD arasýnda fark yoktur).
		Bu mod CD ve DVD disk imajlarýnýn yüklenmesinde kullanýlýr. ISO formatý kullanýlabilir.
		BIN ve NRG imajlarý da bazan kullanýlabilir ise de, malesef, BIN ve NRG imajlarýnýn
		hangi hallerde yüklenebileceðiyle ilgili kesin bilgi yoktur. 

HDD ve FDD modlarý için yüklenen imajlarýn deðiþtirilmesini önleyen "Sadece Okuma"
seçeneði vardýr. CD sürücü emülasyonu hep sadece okuma seçeneðiyle gerçekleþir.


Kurulum
---------------

Eklentiyi kurmadan önce, eklenti sürücüsünü kurmak gereklidir.  VD_Driver altdizinindeki
vd_filedisk.inf dosyasý için durum menüsü açarak "Kur" komutunu seçin.
Sistem vd_filedisk.sys sürücüsünü yükleyecek ve bilgisayarýn yeniden açýlmasýný 
isteyecektir. Yeniden açýlma sürücünün (dolaysýyla eklentinin) çalýþmasý için gereklidir!

INF dosyasýnýnýn durum menüsünde "Kur" komutu yok ise, eski yöntemle sürücüyü
kurabilirsiniz: vd_filedisk.sys dosyasýnýný Windows\System32\Drivers\ dizinine
kopyalayýp  ardýndan vd_filedisk.reg dosyasýna çift týklayarak içeriðini iþletim sisteminin 
kayýt dosyasýna aktarabilir, sonra da bilgisayarý yeniden baþlatabilirsiniz.

ÖNEMLÝ!!!
64-bit Windows versiyonlarýnda, sürücünün kurulmasýyla ilgil yukarda tariflenen
bütün iþlemler sadece Windows Explorer'dan yapýlmalýdýr! Total Commander içerisinden
yapýlýr ise sürücü kurulmaz! Sebebi, TC'nin 32-bit uygulama olmasý ve 64-bit Windows üzerinde
32-bit emülasyon modu ortamýnda çalýþmasýndandýr.

Ardýndan VirtualDisk.wfx eklentisini alýþýlagelmiþ yolla kurabilirsiniz: Configuration 
(Konfigürasyon) diyaloðundan Operation (Ýþlem)'u seçin, FS-Plugins düðmesine basýn,
gelen ekranda Add (Ekle) düðmesine basýn ve eklentinin WFX dosyasýný seçin. Ayrýca, 
Total Commander 6.50 ve sonrasýna eklenmiþ otomatik eklenti kurma özelliðini de 
kullanabilirsiniz: Eklentinin bulunduðu arþiv Total Commander ile açarken eklenti
kendiliðinden kurulacaktýr.
Her iki durumda, yukarda tariflendiði gibi, eklenti sürücüsünün elle kurulmasý gereklidir.


Eklentiyle Çalýþma
-----------------------------

Kurulma sonrasý Total Commander'ýn Network Negihbourhood (Að Komþularý) bölümünde
"Virtual Disks" dizini oluþur. Bu dizinde imaj dosyalarýnýn listesi gösterilir. Baþlangýçta bu
liste boþtur. Ýmaj eklemek için imaj dosyasýný eklentinin bu dizinine kopyalayýnýz. Ýmajýn
kendisi kopyalanmaz, eklenti imajýn sadece baðlantýsýný tutar. Ýmajý listeden çýkarmak için,
alýþýlagelmiþ yolla bu dizinden imajý (aslýnda imaj baðlantýsýný)  siliniz - gerçek dosya
bozulmayacak veya silinmeyecektir.

Ýmaj ayarlarýný deðiþtirmek için, Alt+Enter tuþlarýna basýnýz ya da sað týklama
durum menüsünden "Properties (Özellikler)"i seçiniz. Özellikler diyaloðu ekrana gelir. Bu 
ekranda imaj dosyasýnýn tüm yolu ile güncel durumunu (yüklü/kaldýrýlmýþ) görebilir ve 
sürüca harfi ile yükleme modunu (HDD/FDD/CD) seçebilirsiniz.
Ýmajý yüklemek için Yükle düðmesine basýnýz. Ýmaj yüklü ise, bunun yerine Kaldýr düðmesi görülür.

Bilgisayarýn yeniden baþlatýlmasýya tüm yüklü imajlar kaldýrýlýr. Yeniden baþlatmada, 
gerekli imajlarýn yeniden yüklenmesini saðlayan "Yeniden Baþlatmada Yükle" seçeneði vardýr:
Yeniden baþlatmadan hemen önce imaj yüklü ise, yeniden yüklenir, deðilse kaldýrýlmýþ olarak
kalýr. Otomatik yeniden yükleme sürecinde hata oluþur ise, hatalar, eklenti dizininde bulunan 
VirtualDisk.log dosyasýna yazýlýr.


Eklenityel Çalýþma için ÖNEMLÝ NOTLAR
-------------------------------------------------------------

1. Tatal Commander'ýn farklý oturumlarýnda imajlarý yüklemek/kaldýrmak sakýncalýdýr.
	TC'nin bir kopyasýnýn imajýn yüklü olduðunu, diðerinin kaldýrýlmýþ olduðunu söylemesi
	mümkündür. Halihazýrda, bu tür sorunlarýn çoðu otomatik çözülmektedir, ancak 
	öngörülmeyen durumlar olabilir.
	Deney yapmaktan hoþlananlar için önerim eklentiyi test etmeleridir: Birden fazla TC
	kopyasýnda ayný anda eklenti nasýl çalýþmaktadýr? Bütün sorunlu durumlarý tek baþýma
	bulamam, bulmama yardým edebilirsiniz.
	Kötü senaryolar için,  Özellikler ekranýnda ilave düðme vardýr - "Anahtar Durumu". 
	Bu düðme sadece yükleme etiketini deðiþtirir, imajýn yüklenmesini gerçekte etkilemez.
2. CD imajlarý sadece CD modunda, FAT imajlarý hem HDD hem FDD modlarýnda, 
	NTFS imajlarý da sadece HDD modunda yüklenebilir. Aksi durumda imaj yüklenmez, sanal
	disk görülür, ancak sanal diske ulaþmak istendiðinde sürücünün formatsýz olduðu hatasý
	alýnýr.
3. Yeni sürücü, sürücü listesini sistem aygýtlarýndan alan programlarca görülmez. Çünkü,
	yeni sürücü sistem aygýtý deðildir, yalnýzca mantýksal sürücüdür. Gelecek versiyonlarda
	uygun sistem aygýtý oluþturma özelliðini eklemeye çalýþacaðým.


SSS (Sýkça Sorulan Sorular)
-----------------------------------------

S. Eklentiyi kurdum, imaj yüklemeye çalýþtýðýmda þu hatayý alýyorum:
		Sanal sürücü oluþtururken hata oluþtu!
		Sürücü muhtemelen yüklü deðil.
C. Eklentinin çalýþmasý için eklenti sürücüsünün kurulmasý gereklidir; el ile kurulmalýdýr,
	TC'deki eklentinin otomatik kurulmasý ekleti sürücüsünün kurulmasýný içermemektedir.
	Ekleti sürücüsünün nasýl kurulacaðý yukarýdan, "Kurulum" bölümünden okunabilir.

S. Ýmajý yüklemeye çalýþýrken þu hatayý alýyorum:
		Sanal sürücü oluþtururken hata oluþtu!
		Bu tip yüklenmiþ sürücü zaten yeterince mevcut.		
A. Öndeðer olarak, sürücü her tipten sadece 4 aygýt yüklemeye izin vermektedir (yani sanal
	4 FDD, 4 CD ve 4 HDD) . Daha fazlasýna ihtiyaç duyulur ise, sistem kayýdýndaki þu deðer
	deðiþtirilebilir:
		[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\VD_FileDisk\Parameters]
		NumberOfDevices=dword:00000004
	Deðiþiklikten sonra bilgisayar yeniden baþlatýlmalýdýr.

S. Ýmaj yüklenirken yeni sürücü oluþuyor, ancak  bu sürücüye ulaþamýyorum, hata gösteriyor.
A. Ýmaj formatýnýn eklenti (tam olarak - sürücü) tarafýndan desteklenmediðini gösterir.
	Kazaen, CD/DVD imajýný HDD modunda (veya tersi ) yüklemediðinizden emin olunuz.
	Desteklenen  formatlarýn halen çok sýnýrlý olduðunu unutmayýnýz (Ayrýntýlar için 
	Taným bölümüne bakýnýz).

S. Windows XP/2003 x64'ümde eklenti imaj yüklemiyor. Sorun nedir?
A. Belki, eklenti sürücünü yanlýþ kurmuþ olabilrsiniz. 64-bit Windows sistemlerinde sürücü
	sadece Windows Explorer'dan kurulabilir, Total Commander'dan deðil. Çünkü TC 32-bit 
	uygulamadýr; bu tür uygulamalarýn sistem dizinlerine ve kayýt anahtarlarýna ulaþmalarýna
	Windows x64 vekalet etmektedir. Sonuçta, sürücünün kurulmasý yanlýþ dizinle
	gerçekleþ(me)mektedir.


Her ihtimale karþý, buraya þu UYARI'yý yazýyorum:	
-----------------------------------------------------------------------------

Eklentim, alt düzey Windows fonksiyonlarýyla çalýþtaktadýr ve bu güvenli deðildir. Programýn
bütünüyle doðru çalýþacaðýný (özellikle sürücüleri programlamak konusunda çok
çalýþmadýðýmdan) garanti edemem. Bu yüzden, eklentiyi garantisiz ve vaatsiz "olduðu gibi"
daðýtýyorum. Risleri size ait olmak üzere kullanabilirsiniz.
Eklemek isterim ki, yapabildiðimce, bulunan hatalarý düzeltmeye çalýþacaðým. Herþeyden 
önce eklentiyi kendim kullanýyorum, güvenli ve doðru çalýþmasý da doðrudan beni ilgilendiriyor.


Gelecek planlarý:
----------------------------
* Birden fazla TC oturumuyla doðru çalýþma.
* Sistem aygýtlarý listesine yeni sürücü ekleme.
* Hangi imajlarýn yüklü olduðunu gösterem (Þu an mümkün deðil).
* Standart olmayan formatlarýn desteklenmesi.
* Otomatik sürücü kurulumu.
