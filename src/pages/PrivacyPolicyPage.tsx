import { SITE_NAME } from "../config";

const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <title>{`Gizlilik Politikası - ${SITE_NAME}`}</title>
      <div className="rounded-2xl border border-gray-800 bg-gray-900/70 p-6 md:p-10 shadow-lg shadow-black/20">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-400">
          {SITE_NAME}
        </p>
        <h1 className="mt-3 text-3xl font-bold text-white md:text-4xl">
          Gizlilik Politikası
        </h1>

        <div className="mt-8 space-y-8 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-white">
              1. Kişisel verilerin işlenmesi
            </h2>
            <p className="mt-3 leading-7">
              {SITE_NAME} uygulaması, kullanıcı deneyimini iyileştirmek ve
              hesabın güvenliğini sağlamak için temel kişisel verileri işler. Bu
              veriler arasında e-posta adresi, kullanıcı adı ve oturum bilgileri
              yer alabilir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              2. Verilerin kullanımı
            </h2>
            <p className="mt-3 leading-7">
              Toplanan veriler; kullanıcı girişi, profil oluşturma, favori
              listesi ve izleme günlüğü yönetimi ve hizmetin güvenli şekilde
              çalışması amacıyla kullanılır. E-posta adresiniz hesabınızı
              doğrulamak, şifre sıfırlama bağlantısı göndermek ve iletişim
              mesajlarınıza yanıt vermek için kullanılır. Bu bilgiler üçüncü
              taraflarla satış amacıyla paylaşılmaz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              3. Çerezler ve istemci verileri
            </h2>
            <p className="mt-3 leading-7">
              Oturumunuzun açık kalması ve çerez tercihinizin hatırlanması için
              tarayıcınızın yerel depolama alanına zorunlu teknik veriler
              kaydedilir. Bu veriler hizmetin çalışması için gereklidir ve
              herhangi bir analiz veya reklam amacıyla kullanılmaz.
            </p>
            <p className="mt-3 leading-7">
              Sitenin nasıl kullanıldığını anlamak ve geliştirmek amacıyla,
              yalnızca açık onayınız olması halinde Google LLC tarafından
              sağlanan Google Analytics hizmeti kullanılır. Bu hizmet; ziyaret
              edilen sayfalar, ziyaret süresi, cihaz ve tarayıcı türü ile
              yaklaşık konum gibi bilgileri çerezler aracılığıyla toplar. Bu
              veriler Google'ın yurt dışındaki sunucularında işlenebilir. Reklam
              amaçlı çerezler kullanılmaz.
            </p>
            <p className="mt-3 leading-7">
              Onay vermediğiniz sürece Google Analytics yüklenmez. Verdiğiniz
              onayı istediğiniz zaman sayfanın en altındaki &quot;Çerez
              Tercihleri&quot; bağlantısından geri çekebilirsiniz; bu durumda
              analiz çerezleri silinir ve veri toplanması durdurulur.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              4. Favori, izleme ve yorum verileri
            </h2>
            <p className="mt-3 leading-7">
              Kullanıcılar tarafından kaydedilen favoriler ve izleme kayıtları
              (izleme tarihi, puan, notlar ve kiminle izlendiği bilgisi dahil)
              kişisel takip ve tekrar erişim amacıyla saklanır. Bu veriler diğer
              kullanıcılara gösterilmez; ancak hizmetin yönetimi ve güvenliği
              amacıyla site yöneticisi tarafından görüntülenebilir. Yorumlar
              yönetici onayından sonra kullanıcı adınızla birlikte herkese açık
              olarak yayınlanır.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">5. Güvenlik</h2>
            <p className="mt-3 leading-7">
              Verilerin korunması için uygun teknik ve idari önlemler alınır.
              Ancak internet üzerinden iletilen verilerin tamamen güvenli olduğu
              garanti edilemez.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">6. Haklarınız</h2>
            <p className="mt-3 leading-7">
              Hesabınıza ilişkin bilgileri görüntüleme, güncelleme veya silme
              talebinde bulunabilirsiniz. Bunun için uygulama içindeki profil
              sayfası veya iletişim kanallarını kullanabilirsiniz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              7. Politikada değişiklik
            </h2>
            <p className="mt-3 leading-7">
              Bu gizlilik politikası zaman zaman güncellenebilir. Önemli
              değişiklikler uygulama içinde duyurulacak ve kullanıcılar
              bilgilendirilecektir.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
