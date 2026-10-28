export interface WorkItem {
  id: string;
  title: string;
  category: string;
  image: string;
  href: string;
  subtitle?: string;
  location?: string;
}

export const worksList: WorkItem[] = [
  {
    id: 'ua025',
    title: '【加藤淳設計事務所×Ag-工務店】心地いい暮らしのスタンダード。UA値0.25',
    category: 'オーナーインタビュー',
    image: 'https://jun-arch.com/wp-content/uploads/2026/10/Ehouse-02-1024x683.jpg',
    href: '/works/ua025/',
    subtitle: '三方を住宅に囲まれた約40坪の台形敷地に、杉板張りとUA値0.25の過不足のない住まい。',
    location: '新潟市東区',
  },
  {
    id: 'kobari',
    title: '小針が丘の家',
    category: '新築',
    image: 'https://jun-arch.com/wp-content/uploads/2020/08/01a-1024x682.jpg',
    href: '/works/ua025/',
    location: '新潟市西区',
  },
  {
    id: 'maki',
    title: '巻の家',
    category: '新築',
    image: 'https://jun-arch.com/wp-content/uploads/2020/08/16-1024x678.jpg',
    href: '/works/ua025/',
    location: '新潟市西蒲区',
  },
  {
    id: 'kosudo',
    title: '小須戸の家',
    category: 'リノベーション',
    image: 'https://jun-arch.com/wp-content/uploads/2020/08/002after-1024x682.jpg',
    href: '/works/ua025/',
    location: '新潟市秋葉区',
  },
  {
    id: 'sakuragi',
    title: '桜木町の家',
    category: 'コラボワークス',
    image: 'https://jun-arch.com/wp-content/uploads/2020/08/a99b0710f6f8e00b0a6c22845522112d-1024x681.jpg',
    href: '/works/ua025/',
    location: '新潟市中央区',
  },
  {
    id: 'kameda',
    title: '亀田水道町の家',
    category: '新築',
    image: 'https://jun-arch.com/wp-content/uploads/2020/08/be1db7ef2bbcbb4b59a2a84f00b53edf-768x502.jpg',
    href: '/works/ua025/',
    location: '新潟市江南区',
  },
  {
    id: 'teraodai',
    title: '寺尾台の家',
    category: '新築',
    image: 'https://jun-arch.com/wp-content/uploads/2020/08/9bf7ad65954ddedbd73131c4ea72da1e-1024x1536.jpg',
    href: '/works/ua025/',
    location: '新潟市西区',
  },
  {
    id: 'ogisone',
    title: '荻曽根の家',
    category: '新築',
    image: 'https://jun-arch.com/wp-content/uploads/2020/08/01a-768x512.jpg',
    href: '/works/ua025/',
    location: '新潟市秋葉区',
  },
  {
    id: 'murakami',
    title: '村上の家',
    category: '新築',
    image: 'https://jun-arch.com/wp-content/uploads/2020/08/16-768x509.jpg',
    href: '/works/ua025/',
    location: '村上市',
  },
];

export const ua025Spec = [
  { label: '物件名', value: 'E邸' },
  { label: '所在地', value: '新潟県新潟市東区' },
  { label: '延床面積', value: '99.36㎡（30.00坪）' },
  { label: '1F / 2F', value: '1F: 52.99㎡（16.00坪） / 2F: 46.37㎡（14.00坪）' },
  { label: '竣工年月', value: '2025年8月' },
  { label: '設計', value: '株式会社 加藤淳設計事務所' },
  { label: '施工', value: '株式会社 Ag-工務店' },
  { label: '耐震性能', value: '耐震等級 3（許容応力度計算）' },
  { label: '断熱性能', value: 'UA値 0.25（HEAT20 G2グレード / 等級7クリア）' },
];

export const flowSteps = [
  { step: '01', title: 'ご相談', desc: '土地が決まっていない状態でも大丈夫です。家へのイメージを具体化する「設計カルテ」をもとに、たくさんご希望をお聞かせください。' },
  { step: '02', title: '土地の決定', desc: 'ご希望の方には提携不動産会社と協力し土地探しからお手伝い。下見に同行し、日当たりや法的制限などプロの視点からアドバイスします。' },
  { step: '03', title: '建物プラン(仮)', desc: 'ご希望と敷地条件に合わせた初回プランとおおよそのお見積りを作成。生活の感覚に合わせてブラッシュアップしていきます。' },
  { step: '04', title: '設計契約', desc: '家づくりのパートナーとしてご信頼いただけましたら設計契約へ。ここから詳細なお打合せを一つひとつ楽しんで進めていきます。' },
  { step: '05', title: '工事開始', desc: '工事着工。弊社がお客様の代理として綿密な監理を行い、図面通り施工されているかを厳しくチェックします。' },
  { step: '06', title: 'お引渡し', desc: 'ついに完成。各設備のご説明を行い、新しい住まいのお引渡しとなります。' },
  { step: '07', title: 'アフターフォロー', desc: '定期点検を実施。家の疑問やお困りごとがあればいつでもご連絡ください。ここから本当のお付き合いが始まります。' },
];

export const newsList = [
  {
    date: '2026.10.14',
    category: 'オープンハウスのご案内',
    title: '思い出を刻む機能美を宿す暮らし 2026年11月/7(土)、8(日)、9(月)',
    href: '#',
  },
  {
    date: '2026.06.22',
    category: 'オープンハウスのご案内',
    title: '「海」と「山」を感じる、私たちの暮らし 2026年8月/1(土)、2(日)、3(月)',
    href: '#',
  },
  {
    date: '2026.03.30',
    category: 'オープンハウスのご案内',
    title: '【特別開催】街中で叶えるプライバシーと開放感。~2.5階のある住まい~（4/11〜19）',
    href: '#',
  },
];
export const noteList = [
  {
    date: '2026.10.21',
    title: '【見学会のお知らせ】約44坪の変形地を活かす。25坪で「思い出を刻む、機能美を宿す家」',
    image: 'https://jun-arch.com/wp-content/uploads/2026/10/Ehouse-02-1024x683.jpg',
    href: 'https://note.com/kato_arch',
  },
  {
    date: '2026.10.13',
    title: '「玄関ポーチ」の設計手法 ── 5つの設計実例',
    image: 'https://jun-arch.com/wp-content/uploads/2020/08/01a-1024x682.jpg',
    href: 'https://note.com/kato_arch',
  },
  {
    date: '2026.10.07',
    title: '経年変化をたのしむ暮らし ── 竣工から1年半、「小針が丘の家」を訪ねて',
    image: 'https://jun-arch.com/wp-content/uploads/2020/08/16-1024x678.jpg',
    href: 'https://note.com/kato_arch',
  },
  {
    date: '2026.10.01',
    title: '愛猫と暮らす設計の工夫',
    image: 'https://jun-arch.com/wp-content/uploads/2020/08/002after-1024x682.jpg',
    href: 'https://note.com/kato_arch',
  },
  {
    date: '2026.09.26',
    title: '「無機質」を馴染ませる設計の工夫',
    image: 'https://jun-arch.com/wp-content/uploads/2020/08/a99b0710f6f8e00b0a6c22845522112d-1024x681.jpg',
    href: 'https://note.com/kato_arch',
  },
  {
    date: '2026.09.18',
    title: '1本のペンの購入に悩んだ独立後のこと',
    image: 'https://jun-arch.com/wp-content/uploads/2020/08/be1db7ef2bbcbb4b59a2a84f00b53edf-768x502.jpg',
    href: 'https://note.com/kato_arch',
  },
];

export const mediaList = [
  {
    date: '2025.03.25',
    category: '雑誌掲載',
    title: 'ハウジングKomachi特別特集『新潟で建てた家実例集』',
    href: '/media/',
  },
  {
    date: '2025.01.30',
    category: '雑誌掲載',
    title: '月刊アーキテクトビルダー1・2月号',
    href: '/media/',
  },
  {
    date: '2024.08.27',
    category: '雑誌掲載',
    title: '建築知識ビルダーズ『子どもを伸ばす住宅設計術』',
    href: '/media/',
  },
];

