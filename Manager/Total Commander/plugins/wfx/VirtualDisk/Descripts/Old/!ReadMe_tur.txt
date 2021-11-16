Virtual Disk, Version 1.30 Final

Disk imajlar�n� sistemde ek  sanal s�r�c� �eklinde y�klemeyi sa�layan
Total Commander i�in FS (dosya sistemi) eklentisi.

Ekleni Yazar�: Konstantin Vlasov, 2009
Anasayfa: http://flint-inc.ru/
E-posta: support@flint_inc.ru

S�r�c�, Bo Branten'in 2004  tarihli a��k kaynakl� FileDisk projesi  tabanl�d�r.
Anasayfa: http://www.acc.umu.se/~bosse/
E-posta:   bosse@acc.umu.se


Tan�m
----------

Bu eklenti, disk imajlar�n� ek s�r�c�ler gibi y�klenmesini sa�lar. Sadece
Windows 2000 ve Windows XP/2003 32/64-bit ile �al���r.
�maj y�klendi�inde, sistemde yeni s�r�c� olu�ur. S�r�c� harfi, daha �nce
belirlenmi�tir. Yeni s�r�c� imaj dosyas�n�n b�t�n i�eri�ini bar�nd�r�r.

�� mod mevcuttur:
	1. HDD -  yerel sabit disk s�r�c� em�lasyonu. Bu modda, FAT veya NTFS sistemiyle
		formatlanan sabit  s�r�c� b�l�mlerine ait imaj y�klenebilir.  Yine FAT dosya
		sistemine sahip flash s�r�c�ler ve disketlerin imajlar� da bu modda kullan�labilir.
	2. FDD - disket s�r�c� em�lasyonu. Bu mod, NTFS b�l�m� d���nda HDD modundaki
		b�t�n imajlar�n y�klenmesini sa�lar (Windows  disketler �zerinde NTFS
		kullan�lmas�na izin vermez).
	3. CD/DVD - CD s�r�c� em�lasyonu (sistem a��s�ndan CD ve DVD aras�nda fark yoktur).
		Bu mod CD ve DVD disk imajlar�n�n y�klenmesinde kullan�l�r. ISO format� kullan�labilir.
		BIN ve NRG imajlar� da bazan kullan�labilir ise de, malesef, BIN ve NRG imajlar�n�n
		hangi hallerde y�klenebilece�iyle ilgili kesin bilgi yoktur. 

HDD ve FDD modlar� i�in y�klenen imajlar�n de�i�tirilmesini �nleyen "Sadece Okuma"
se�ene�i vard�r. CD s�r�c� em�lasyonu hep sadece okuma se�ene�iyle ger�ekle�ir.


Kurulum
---------------

Eklentiyi kurmadan �nce, eklenti s�r�c�s�n� kurmak gereklidir.  VD_Driver altdizinindeki
vd_filedisk.inf dosyas� i�in durum men�s� a�arak "Kur" komutunu se�in.
Sistem vd_filedisk.sys s�r�c�s�n� y�kleyecek ve bilgisayar�n yeniden a��lmas�n� 
isteyecektir. Yeniden a��lma s�r�c�n�n (dolays�yla eklentinin) �al��mas� i�in gereklidir!

INF dosyas�n�n�n durum men�s�nde "Kur" komutu yok ise, eski y�ntemle s�r�c�y�
kurabilirsiniz: vd_filedisk.sys dosyas�n�n� Windows\System32\Drivers\ dizinine
kopyalay�p  ard�ndan vd_filedisk.reg dosyas�na �ift t�klayarak i�eri�ini i�letim sisteminin 
kay�t dosyas�na aktarabilir, sonra da bilgisayar� yeniden ba�latabilirsiniz.

�NEML�!!!
64-bit Windows versiyonlar�nda, s�r�c�n�n kurulmas�yla ilgil yukarda tariflenen
b�t�n i�lemler sadece Windows Explorer'dan yap�lmal�d�r! Total Commander i�erisinden
yap�l�r ise s�r�c� kurulmaz! Sebebi, TC'nin 32-bit uygulama olmas� ve 64-bit Windows �zerinde
32-bit em�lasyon modu ortam�nda �al��mas�ndand�r.

Ard�ndan VirtualDisk.wfx eklentisini al���lagelmi� yolla kurabilirsiniz: Configuration 
(Konfig�rasyon) diyalo�undan Operation (��lem)'u se�in, FS-Plugins d��mesine bas�n,
gelen ekranda Add (Ekle) d��mesine bas�n ve eklentinin WFX dosyas�n� se�in. Ayr�ca, 
Total Commander 6.50 ve sonras�na eklenmi� otomatik eklenti kurma �zelli�ini de 
kullanabilirsiniz: Eklentinin bulundu�u ar�iv Total Commander ile a�arken eklenti
kendili�inden kurulacakt�r.
Her iki durumda, yukarda tariflendi�i gibi, eklenti s�r�c�s�n�n elle kurulmas� gereklidir.


Eklentiyle �al��ma
-----------------------------

Kurulma sonras� Total Commander'�n Network Negihbourhood (A� Kom�ular�) b�l�m�nde
"Virtual Disks" dizini olu�ur. Bu dizinde imaj dosyalar�n�n listesi g�sterilir. Ba�lang��ta bu
liste bo�tur. �maj eklemek i�in imaj dosyas�n� eklentinin bu dizinine kopyalay�n�z. �maj�n
kendisi kopyalanmaz, eklenti imaj�n sadece ba�lant�s�n� tutar. �maj� listeden ��karmak i�in,
al���lagelmi� yolla bu dizinden imaj� (asl�nda imaj ba�lant�s�n�)  siliniz - ger�ek dosya
bozulmayacak veya silinmeyecektir.

�maj ayarlar�n� de�i�tirmek i�in, Alt+Enter tu�lar�na bas�n�z ya da sa� t�klama
durum men�s�nden "Properties (�zellikler)"i se�iniz. �zellikler diyalo�u ekrana gelir. Bu 
ekranda imaj dosyas�n�n t�m yolu ile g�ncel durumunu (y�kl�/kald�r�lm��) g�rebilir ve 
s�r�ca harfi ile y�kleme modunu (HDD/FDD/CD) se�ebilirsiniz.
�maj� y�klemek i�in Y�kle d��mesine bas�n�z. �maj y�kl� ise, bunun yerine Kald�r d��mesi g�r�l�r.

Bilgisayar�n yeniden ba�lat�lmas�ya t�m y�kl� imajlar kald�r�l�r. Yeniden ba�latmada, 
gerekli imajlar�n yeniden y�klenmesini sa�layan "Yeniden Ba�latmada Y�kle" se�ene�i vard�r:
Yeniden ba�latmadan hemen �nce imaj y�kl� ise, yeniden y�klenir, de�ilse kald�r�lm�� olarak
kal�r. Otomatik yeniden y�kleme s�recinde hata olu�ur ise, hatalar, eklenti dizininde bulunan 
VirtualDisk.log dosyas�na yaz�l�r.


Eklenityel �al��ma i�in �NEML� NOTLAR
-------------------------------------------------------------

1. Tatal Commander'�n farkl� oturumlar�nda imajlar� y�klemek/kald�rmak sak�ncal�d�r.
	TC'nin bir kopyas�n�n imaj�n y�kl� oldu�unu, di�erinin kald�r�lm�� oldu�unu s�ylemesi
	m�mk�nd�r. Halihaz�rda, bu t�r sorunlar�n �o�u otomatik ��z�lmektedir, ancak 
	�ng�r�lmeyen durumlar olabilir.
	Deney yapmaktan ho�lananlar i�in �nerim eklentiyi test etmeleridir: Birden fazla TC
	kopyas�nda ayn� anda eklenti nas�l �al��maktad�r? B�t�n sorunlu durumlar� tek ba��ma
	bulamam, bulmama yard�m edebilirsiniz.
	K�t� senaryolar i�in,  �zellikler ekran�nda ilave d��me vard�r - "Anahtar Durumu". 
	Bu d��me sadece y�kleme etiketini de�i�tirir, imaj�n y�klenmesini ger�ekte etkilemez.
2. CD imajlar� sadece CD modunda, FAT imajlar� hem HDD hem FDD modlar�nda, 
	NTFS imajlar� da sadece HDD modunda y�klenebilir. Aksi durumda imaj y�klenmez, sanal
	disk g�r�l�r, ancak sanal diske ula�mak istendi�inde s�r�c�n�n formats�z oldu�u hatas�
	al�n�r.
3. Yeni s�r�c�, s�r�c� listesini sistem ayg�tlar�ndan alan programlarca g�r�lmez. ��nk�,
	yeni s�r�c� sistem ayg�t� de�ildir, yaln�zca mant�ksal s�r�c�d�r. Gelecek versiyonlarda
	uygun sistem ayg�t� olu�turma �zelli�ini eklemeye �al��aca��m.


SSS (S�k�a Sorulan Sorular)
-----------------------------------------

S. Eklentiyi kurdum, imaj y�klemeye �al��t���mda �u hatay� al�yorum:
		Sanal s�r�c� olu�tururken hata olu�tu!
		S�r�c� muhtemelen y�kl� de�il.
C. Eklentinin �al��mas� i�in eklenti s�r�c�s�n�n kurulmas� gereklidir; el ile kurulmal�d�r,
	TC'deki eklentinin otomatik kurulmas� ekleti s�r�c�s�n�n kurulmas�n� i�ermemektedir.
	Ekleti s�r�c�s�n�n nas�l kurulaca�� yukar�dan, "Kurulum" b�l�m�nden okunabilir.

S. �maj� y�klemeye �al���rken �u hatay� al�yorum:
		Sanal s�r�c� olu�tururken hata olu�tu!
		Bu tip y�klenmi� s�r�c� zaten yeterince mevcut.		
A. �nde�er olarak, s�r�c� her tipten sadece 4 ayg�t y�klemeye izin vermektedir (yani sanal
	4 FDD, 4 CD ve 4 HDD) . Daha fazlas�na ihtiya� duyulur ise, sistem kay�d�ndaki �u de�er
	de�i�tirilebilir:
		[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\VD_FileDisk\Parameters]
		NumberOfDevices=dword:00000004
	De�i�iklikten sonra bilgisayar yeniden ba�lat�lmal�d�r.

S. �maj y�klenirken yeni s�r�c� olu�uyor, ancak  bu s�r�c�ye ula�am�yorum, hata g�steriyor.
A. �maj format�n�n eklenti (tam olarak - s�r�c�) taraf�ndan desteklenmedi�ini g�sterir.
	Kazaen, CD/DVD imaj�n� HDD modunda (veya tersi ) y�klemedi�inizden emin olunuz.
	Desteklenen  formatlar�n halen �ok s�n�rl� oldu�unu unutmay�n�z (Ayr�nt�lar i�in 
	Tan�m b�l�m�ne bak�n�z).

S. Windows XP/2003 x64'�mde eklenti imaj y�klemiyor. Sorun nedir?
A. Belki, eklenti s�r�c�n� yanl�� kurmu� olabilrsiniz. 64-bit Windows sistemlerinde s�r�c�
	sadece Windows Explorer'dan kurulabilir, Total Commander'dan de�il. ��nk� TC 32-bit 
	uygulamad�r; bu t�r uygulamalar�n sistem dizinlerine ve kay�t anahtarlar�na ula�malar�na
	Windows x64 vekalet etmektedir. Sonu�ta, s�r�c�n�n kurulmas� yanl�� dizinle
	ger�ekle�(me)mektedir.


Her ihtimale kar��, buraya �u UYARI'y� yaz�yorum:	
-----------------------------------------------------------------------------

Eklentim, alt d�zey Windows fonksiyonlar�yla �al��taktad�r ve bu g�venli de�ildir. Program�n
b�t�n�yle do�ru �al��aca��n� (�zellikle s�r�c�leri programlamak konusunda �ok
�al��mad���mdan) garanti edemem. Bu y�zden, eklentiyi garantisiz ve vaatsiz "oldu�u gibi"
da��t�yorum. Risleri size ait olmak �zere kullanabilirsiniz.
Eklemek isterim ki, yapabildi�imce, bulunan hatalar� d�zeltmeye �al��aca��m. Her�eyden 
�nce eklentiyi kendim kullan�yorum, g�venli ve do�ru �al��mas� da do�rudan beni ilgilendiriyor.


Gelecek planlar�:
----------------------------
* Birden fazla TC oturumuyla do�ru �al��ma.
* Sistem ayg�tlar� listesine yeni s�r�c� ekleme.
* Hangi imajlar�n y�kl� oldu�unu g�sterem (�u an m�mk�n de�il).
* Standart olmayan formatlar�n desteklenmesi.
* Otomatik s�r�c� kurulumu.
