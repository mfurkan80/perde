const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="rounded-2xl border border-gray-800 bg-gray-900/70 p-6 md:p-10 shadow-lg shadow-black/20">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-gray-400">
          Perde
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
              Perde uygulaması, kullanıcı deneyimini iyileştirmek ve hesabın
              güvenliğini sağlamak için temel kişisel verileri işler. Bu veriler
              arasında e-posta adresi, kullanıcı adı ve oturum bilgileri yer
              alabilir.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              2. Verilerin kullanımı
            </h2>
            <p className="mt-3 leading-7">
              Toplanan veriler; kullanıcı girişi, profil oluşturma, favori
              listesi yönetimi ve hizmetin güvenli şekilde çalışması amacıyla
              kullanılır. Bu bilgiler üçüncü taraflarla satış amacıyla
              paylaşılmaz.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              3. Çerezler ve istemci verileri
            </h2>
            <p className="mt-3 leading-7">
              Uygulama, oturumun açık kalması ve kullanıcı tercihlerinin
              hatırlanması için gerekli teknik verileri kullanabilir. Bu veriler
              sadece kullanıcının daha iyi bir deneyim yaşamasına yardımcı olmak
              amacıyla tutulur.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white">
              4. Favori ve içerik verileri
            </h2>
            <p className="mt-3 leading-7">
              Kullanıcılar tarafından kaydedilen favoriler, kişisel izleme ve
              tekrar erişim amacıyla saklanır. Bu veriler kullanıcı hesabına
              özel olarak kullanılır.
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
