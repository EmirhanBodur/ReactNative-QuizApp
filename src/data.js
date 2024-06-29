const questions = [
  {
    question:
      "JavaScript dilinde 'var', 'let' ve 'const' değişken tanımlama anahtar kelimeleri arasındaki fark nedir?",
    choices: [
      "'var' sadece fonksiyon kapsamında, 'let' ve 'const' ise blok kapsamında kullanılabilir.",
      "'let' ve 'const' sadece fonksiyon kapsamında, 'var' ise blok kapsamında kullanılabilir.",
      "'var' ve 'let' sadece fonksiyon kapsamında, 'const' ise blok kapsamında kullanılabilir.",
      "'let' sadece blok kapsamında, 'var' ve 'const' ise fonksiyon kapsamında kullanılabilir.",
    ],
    answer: 0, // Doğru cevabın indeksi 0 olarak güncellendi
  },
  {
    question: "React'te 'state' ve 'props' arasındaki fark nedir?",
    choices: [
      "'state', bileşen içinde değiştirilebilirken, 'props' sadece bir üst bileşen tarafından iletilen verileri içerir ve değiştirilemez.",
      "'state', sadece ana bileşenlerde kullanılırken, 'props' her bileşen tarafından kullanılabilir ve değiştirilebilir.",
      "'state' ve 'props' arasında temel bir fark yoktur, ikisi de aynı işlevi görür.",
      "'state', sadece fonksiyonel bileşenlerde kullanılırken, 'props' sadece sınıflı bileşenlerde kullanılır.",
    ],
    answer: 0, // Doğru cevabın indeksi 0 olarak güncellendi
  },
  {
    question: "React Hooks'taki 'useState' fonksiyonu ne işe yarar?",
    choices: [
      "Bir bileşenin durumunu güncellemek için kullanılır.",
      "Bir bileşenin özel fonksiyonlarını tanımlamak için kullanılır.",
      "Bir bileşenin başka bir bileşene veri aktarmak için kullanılır.",
      "Bir bileşenin render edilip edilmediğini kontrol etmek için kullanılır.",
    ],
    answer: 0, // Doğru cevabın indeksi 0 olarak güncellendi
  },
  {
    question: "JavaScript'te 'map' fonksiyonu ne işe yarar?",
    choices: [
      "Dizinin belirli bir elemanını değiştirmek için kullanılır.",
      "Dizinin her elemanına belirli bir işlem uygulamak için kullanılır.",
      "Diziyi tersine çevirmek için kullanılır.",
      "Dizi içinde belirli bir elemanın var olup olmadığını kontrol etmek için kullanılır.",
    ],
    answer: 1, // Doğru cevabın indeksi 1 olarak güncellendi
  },
  {
    question: "React'te 'useEffect' hook'u ne işe yarar?",
    choices: [
      "Bir bileşenin içindeki durumu güncellemek için kullanılır.",
      "Bir bileşenin yaşam döngüsüne müdahale etmek için kullanılır.",
      "Bir bileşenin içinde başka bir bileşeni çağırmak için kullanılır.",
      "Bir bileşenin başka bir bileşene veri iletmek için kullanılır.",
    ],
    answer: 1, // Doğru cevabın indeksi 1 olarak güncellendi
  },
];

export default questions;
