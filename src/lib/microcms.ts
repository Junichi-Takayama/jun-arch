import { createClient, type MicroCMSQueries } from 'microcms-js-sdk';

// ==========================================
// 1. 型定義 (News)
// ==========================================

export interface NewsCategory {
  id: string;
  name: string;
}

export interface NewsItem {
  id: string;
  title: string;
  publishedAt?: string;
  createdAt?: string;
  date: string; // 表示用（YYYY.MM.DD）
  category: string;
  content: string; // HTML文字列
  thumbnail?: {
    url: string;
    width?: number;
    height?: number;
  };
}

// microCMSレスポンス用生データ型
interface MicroCMSNewsRaw {
  id: string;
  title: string;
  publishedAt?: string;
  createdAt?: string;
  date?: string;
  category?: string | { id?: string; name?: string };
  content?: string;
  body?: string;
  thumbnail?: { url: string; width?: number; height?: number };
}

// ==========================================
// 2. フォールバック・モックデータ（加藤淳設計事務所 実データ準拠）
// ==========================================

export const MOCK_NEWS: NewsItem[] = [
  {
    id: '2026-10-14-openhouse',
    title: '思い出を刻む機能美を宿す暮らし 2026年11月/7(土)、8(日)、9(月)',
    date: '2026.10.14',
    category: 'オープンハウスのご案内',
    publishedAt: '2026-10-14T09:00:00.000Z',
    content: `
      <p>この度、お施主様のご厚意により、新潟市内にて完成見学会（オープンハウス）を開催いたします。</p>
      <p>家族の思い出を刻む無垢材の経年美と、暮らしやすさを突き詰めた機能美が調和する住まいです。過不足のない設計、高気密・高断熱性能がもたらす心地よさをぜひ実機でご体感ください。</p>
      <div style="background-color: #f7f7f7; padding: 1.5rem; margin: 2rem 0; border: 1px solid #eeeeee; border-radius: 4px;">
        <h4 style="font-weight: 700; margin-bottom: 0.75rem; color: #333333; font-size: 0.95rem;">見学会 概要</h4>
        <p style="margin: 0.25rem 0; font-size: 0.85rem; color: #555555;">・日時：2026年11月7日(土) 〜 11月9日(月) 10:00〜17:00</p>
        <p style="margin: 0.25rem 0; font-size: 0.85rem; color: #555555;">・場所：新潟県新潟市（ご予約確定後に詳細なご案内図をお送りいたします）</p>
        <p style="margin: 0.25rem 0; font-size: 0.85rem; color: #555555;">・形式：完全予約制（1組ずつのご案内）</p>
        <p style="margin: 0.25rem 0; font-size: 0.85rem; color: #555555;">・性能：耐震等級3 / 高断熱仕様</p>
      </div>
      <p>見学をご希望の方は、お問い合わせフォームまたはお電話にて事前にお申し込みください。皆さまのご来場を心よりお待ち申し上げております。</p>
    `,
    thumbnail: {
      url: 'https://jun-arch.com/wp-content/uploads/2026/10/Ehouse-02-1024x683.jpg',
      width: 1024,
      height: 683,
    },
  },
  {
    id: '2026-06-22-openhouse',
    title: '「海」と「山」を感じる、私たちの暮らし 2026年8月/1(土)、2(日)、3(月)',
    date: '2026.06.22',
    category: 'オープンハウスのご案内',
    publishedAt: '2026-06-22T09:00:00.000Z',
    content: `
      <p>新潟の自然と対話し、四季の移ろいを肌で感じる住まいが完成いたしました。</p>
      <p>周囲の景観を取り込む窓の配置や、風の流れを計算したパッシブデザインを取り入れています。自然素材に包まれた健やかな暮らしをご体感いただけます。</p>
    `,
    thumbnail: {
      url: 'https://jun-arch.com/wp-content/uploads/2020/08/16-1024x678.jpg',
      width: 1024,
      height: 678,
    },
  },
  {
    id: '2026-03-30-openhouse',
    title: '【特別開催】街中で叶えるプライバシーと開放感。~2.5階のある住まい~（4/11〜19）',
    date: '2026.03.30',
    category: 'オープンハウスのご案内',
    publishedAt: '2026-03-30T09:00:00.000Z',
    content: `
      <p>市街地の限られた敷地条件において、外部からの視線を遮りながら光と広がりを確保した「2.5階」の住まいです。</p>
      <p>スキップフロアによる立体的な空間構成と、無駄のない収納計画をご覧いただけます。</p>
    `,
    thumbnail: {
      url: 'https://jun-arch.com/wp-content/uploads/2020/08/01a-1024x682.jpg',
      width: 1024,
      height: 682,
    },
  },
];


// ==========================================
// 3. microCMS クライアント初期化
// ==========================================

const serviceDomain = import.meta.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = import.meta.env.MICROCMS_API_KEY;

export const isMicroCMSConfigured = Boolean(serviceDomain && apiKey);

export const client = isMicroCMSConfigured
  ? createClient({
      serviceDomain: serviceDomain as string,
      apiKey: apiKey as string,
    })
  : null;

function formatNewsItem(item: MicroCMSNewsRaw): NewsItem {
  let categoryName = 'お知らせ';
  if (typeof item.category === 'object' && item.category !== null) {
    categoryName = item.category.name || 'お知らせ';
  } else if (typeof item.category === 'string' && item.category.trim() !== '') {
    categoryName = item.category;
  }

  const rawDate = item.publishedAt || item.createdAt;
  const dateStr = rawDate
    ? new Date(rawDate).toISOString().split('T')[0].replace(/-/g, '.')
    : item.date || '2026.10.01';

  return {
    id: item.id,
    title: item.title,
    publishedAt: item.publishedAt,
    createdAt: item.createdAt,
    date: dateStr,
    category: categoryName,
    content: item.content || item.body || '',
    thumbnail: item.thumbnail,
  };
}

// ==========================================
// 4. データ取得関数（フォールバック付き）
// ==========================================

export async function getNewsList(queries?: MicroCMSQueries): Promise<NewsItem[]> {
  if (!client) {
    const list = [...MOCK_NEWS];
    if (queries?.limit && queries.limit > 0) {
      return list.slice(0, queries.limit);
    }
    return list;
  }

  try {
    const res = await client.getList<MicroCMSNewsRaw>({
      endpoint: 'news',
      queries: {
        orders: '-publishedAt',
        ...queries,
      },
    });

    return res.contents.map(formatNewsItem);
  } catch (error) {
    console.warn('[microCMS] news一覧の取得に失敗したため、モックデータを返却します:', error);
    const list = [...MOCK_NEWS];
    if (queries?.limit && queries.limit > 0) {
      return list.slice(0, queries.limit);
    }
    return list;
  }
}

export async function getNewsDetail(contentId: string, queries?: MicroCMSQueries): Promise<NewsItem | null> {
  if (!client) {
    return MOCK_NEWS.find((item) => item.id === contentId) || null;
  }

  try {
    const item = await client.getListDetail<MicroCMSNewsRaw>({
      endpoint: 'news',
      contentId,
      queries,
    });
    return formatNewsItem(item);
  } catch (error) {
    console.warn(`[microCMS] news/${contentId} の取得に失敗したため、モックデータを検索します:`, error);
    return MOCK_NEWS.find((item) => item.id === contentId) || null;
  }
}
