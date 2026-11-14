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
  show_form?: boolean;
  event_date1?: string;
  event_date2?: string;
  event_date3?: string;
}

// microCMSレスポンス用生データ型
interface MicroCMSNewsRaw {
  id: string;
  title: string;
  publishedAt?: string;
  createdAt?: string;
  date?: string;
  category?: string | string[] | { id?: string; name?: string } | { id?: string; name?: string }[];
  content?: string;
  body?: string;
  thumbnail?: { url: string; width?: number; height?: number };
  show_form?: boolean;
  event_date1?: string;
  event_date2?: string;
  event_date3?: string;
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
  if (Array.isArray(item.category) && item.category.length > 0) {
    const firstCat = item.category[0];
    categoryName = typeof firstCat === 'string' ? firstCat : (firstCat.name || 'お知らせ');
  } else if (typeof item.category === 'object' && item.category !== null) {
    categoryName = (item.category as { id?: string; name?: string }).name || 'お知らせ';
  } else if (typeof item.category === 'string' && item.category.trim() !== '') {
    categoryName = item.category;
  }

  const rawDate = item.date || item.publishedAt || item.createdAt;
  const dateStr = rawDate
    ? new Date(rawDate).toISOString().split('T')[0].replace(/-/g, '.')
    : '2026.10.01';

  return {
    id: item.id,
    title: item.title,
    publishedAt: item.publishedAt,
    createdAt: item.createdAt,
    date: dateStr,
    category: categoryName,
    content: item.content || item.body || '',
    thumbnail: item.thumbnail,
    show_form: Boolean(item.show_form),
    event_date1: item.event_date1,
    event_date2: item.event_date2,
    event_date3: item.event_date3,
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
    const mergedQueries = {
      orders: '-date',
      ...queries,
    };

    // limit の指定がない場合は getAllContents で全件取得
    if (!queries?.limit) {
      const allContents = await client.getAllContents<MicroCMSNewsRaw>({
        endpoint: 'news',
        queries: mergedQueries,
      });
      return allContents.map(formatNewsItem);
    }

    const res = await client.getList<MicroCMSNewsRaw>({
      endpoint: 'news',
      queries: mergedQueries,
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


// ==========================================
// 5. 型定義 & 取得関数 (Owner Interview)
// ==========================================

import mockOwnerInterviews from '../data/ownerInterviews.json';

export interface OwnerInterviewItem {
  id: string;
  title: string;
  publishedAt?: string;
  createdAt?: string;
  date: string; // 表示用（YYYY.MM.DD）
  content: string; // HTML文字列
  thumbnail?: {
    url: string;
    width?: number;
    height?: number;
  };
  isExternal?: boolean;
  externalUrl?: string;
}

interface MicroCMSOwnerInterviewRaw {
  id: string;
  title: string;
  publishedAt?: string;
  createdAt?: string;
  date?: string;
  contents?: string;
  content?: string;
  thumbnail?: { url: string; width?: number; height?: number } | string;
  external_url?: string;
}

export const MOCK_OWNER_INTERVIEWS: OwnerInterviewItem[] = mockOwnerInterviews as OwnerInterviewItem[];

function formatOwnerInterviewItem(item: MicroCMSOwnerInterviewRaw): OwnerInterviewItem {
  const rawDate = item.date || item.publishedAt || item.createdAt;
  const dateStr = rawDate
    ? new Date(rawDate).toISOString().split('T')[0].replace(/-/g, '.')
    : '2026.10.01';

  let thumbObj: { url: string; width?: number; height?: number } | undefined;
  if (typeof item.thumbnail === 'object' && item.thumbnail !== null) {
    thumbObj = item.thumbnail;
  } else if (typeof item.thumbnail === 'string' && item.thumbnail.trim() !== '') {
    thumbObj = { url: item.thumbnail, width: 1024, height: 683 };
  }

  const bodyHtml = item.contents || item.content || '';

  // サムネイルが未設定の場合、本文最初の [[IMG: ...]] をサムネイルとして自動充当
  if (!thumbObj && bodyHtml) {
    const imgMatch = bodyHtml.match(/\[\[IMG:\s*([^\]]+)\]\]/);
    if (imgMatch) {
      thumbObj = { url: imgMatch[1].trim(), width: 1024, height: 683 };
    }
  }

  // 外部取材URLの判定（microCMSの external_url 入力値、または本文内既存カードからの抽出）
  let extUrl = item.external_url?.trim() || '';
  if (!extUrl && bodyHtml.includes('external-link-card')) {
    const linkMatch = bodyHtml.match(/href="(https?:\/\/[^"]+)"/);
    if (linkMatch) {
      extUrl = linkMatch[1];
    }
  }

  const isExternal = Boolean(extUrl) || item.id.startsWith('daily-lives-') || bodyHtml.includes('external-link-card') || bodyHtml.includes('Daily Lives Niigata 取材記事を読む');

  return {
    id: item.id,
    title: item.title,
    publishedAt: item.publishedAt,
    createdAt: item.createdAt,
    date: dateStr,
    content: bodyHtml,
    thumbnail: thumbObj,
    isExternal,
    externalUrl: extUrl || undefined,
  };
}

export async function getOwnerInterviewList(queries?: MicroCMSQueries): Promise<OwnerInterviewItem[]> {
  if (!client) {
    const list = [...MOCK_OWNER_INTERVIEWS];
    if (queries?.limit && queries.limit > 0) {
      return list.slice(0, queries.limit);
    }
    return list;
  }

  try {
    const mergedQueries = {
      orders: '-date',
      ...queries,
    };

    if (!queries?.limit) {
      const allContents = await client.getAllContents<MicroCMSOwnerInterviewRaw>({
        endpoint: 'owner-interview',
        queries: mergedQueries,
      });
      if (allContents.length > 0) {
        return allContents.map(formatOwnerInterviewItem);
      }
      // microCMS上が0件の場合はフォールバックを返却
      return [...MOCK_OWNER_INTERVIEWS];
    }

    const res = await client.getList<MicroCMSOwnerInterviewRaw>({
      endpoint: 'owner-interview',
      queries: mergedQueries,
    });

    if (res.contents.length > 0) {
      return res.contents.map(formatOwnerInterviewItem);
    }
    return [...MOCK_OWNER_INTERVIEWS];
  } catch (error) {
    console.warn('[microCMS] owner-interview一覧の取得に失敗したため、モックデータを返却します:', error);
    const list = [...MOCK_OWNER_INTERVIEWS];
    if (queries?.limit && queries.limit > 0) {
      return list.slice(0, queries.limit);
    }
    return list;
  }
}

export async function getOwnerInterviewDetail(contentId: string, queries?: MicroCMSQueries): Promise<OwnerInterviewItem | null> {
  if (!client) {
    return MOCK_OWNER_INTERVIEWS.find((item) => item.id === contentId) || null;
  }

  try {
    const item = await client.getListDetail<MicroCMSOwnerInterviewRaw>({
      endpoint: 'owner-interview',
      contentId,
      queries,
    });
    return formatOwnerInterviewItem(item);
  } catch (error) {
    console.warn(`[microCMS] owner-interview/${contentId} の取得に失敗したため、モックデータを検索します:`, error);
    return MOCK_OWNER_INTERVIEWS.find((item) => item.id === contentId) || null;
  }
}


// ==========================================
// 6. 型定義 & 取得関数 (Media)
// ==========================================

import mockMedia from '../data/media.json';

export interface MediaItem {
  id: string;
  title: string;
  category: string;
  publishedAt?: string;
  createdAt?: string;
  date: string; // 表示用（YYYY.MM.DD）
  content: string; // HTML文字列
  thumbnail?: {
    url: string;
    width?: number;
    height?: number;
  };
}

interface MicroCMSMediaRaw {
  id: string;
  title: string;
  category?: string | string[] | { id?: string; name?: string };
  publishedAt?: string;
  createdAt?: string;
  date?: string;
  contents?: string;
  content?: string;
  thumbnail?: { url: string; width?: number; height?: number } | string;
}

export const MOCK_MEDIA: MediaItem[] = mockMedia as MediaItem[];

function formatMediaItem(item: MicroCMSMediaRaw): MediaItem {
  const rawDate = item.date || item.publishedAt || item.createdAt;
  const dateStr = rawDate
    ? new Date(rawDate).toISOString().split('T')[0].replace(/-/g, '.')
    : '2025.01.01';

  let thumbObj: { url: string; width?: number; height?: number } | undefined;
  if (typeof item.thumbnail === 'object' && item.thumbnail !== null) {
    thumbObj = item.thumbnail;
  } else if (typeof item.thumbnail === 'string' && item.thumbnail.trim() !== '') {
    thumbObj = { url: item.thumbnail, width: 1024, height: 768 };
  }

  const bodyHtml = item.contents || item.content || '';

  // サムネイルが未設定の場合、本文最初の [[IMG: ...]] をサムネイルとして自動充当
  if (!thumbObj && bodyHtml) {
    const imgMatch = bodyHtml.match(/\[\[IMG:\s*([^\]]+)\]\]/);
    if (imgMatch) {
      thumbObj = { url: imgMatch[1].trim(), width: 1024, height: 768 };
    }
  }

  let categoryName = 'メディア掲載';
  if (typeof item.category === 'string') {
    categoryName = item.category;
  } else if (Array.isArray(item.category) && item.category.length > 0) {
    const first = item.category[0];
    categoryName = typeof first === 'string' ? first : (first.name || 'メディア掲載');
  } else if (typeof item.category === 'object' && item.category !== null) {
    categoryName = (item.category as { name?: string }).name || 'メディア掲載';
  } else if (item.title) {
    // タイトルからカテゴリを自動判定
    if (item.title.includes('雑誌掲載')) categoryName = '雑誌掲載';
    else if (item.title.includes('WEB掲載') || item.title.includes('Web掲載') || item.title.includes('徹底解剖')) categoryName = 'WEB掲載';
    else if (item.title.includes('動画掲載') || item.title.includes('YouTube')) categoryName = '動画掲載';
  }

  return {
    id: item.id,
    title: item.title,
    category: categoryName,
    publishedAt: item.publishedAt,
    createdAt: item.createdAt,
    date: dateStr,
    content: bodyHtml,
    thumbnail: thumbObj,
  };
}

export async function getMediaList(queries?: MicroCMSQueries): Promise<MediaItem[]> {
  if (!client) {
    const list = [...MOCK_MEDIA];
    if (queries?.limit && queries.limit > 0) {
      return list.slice(0, queries.limit);
    }
    return list;
  }

  try {
    const mergedQueries = {
      orders: '-date',
      ...queries,
    };

    if (!queries?.limit) {
      const allContents = await client.getAllContents<MicroCMSMediaRaw>({
        endpoint: 'media',
        queries: mergedQueries,
      });
      if (allContents.length > 0) {
        return allContents.map(formatMediaItem);
      }
      return [...MOCK_MEDIA];
    }

    const res = await client.getList<MicroCMSMediaRaw>({
      endpoint: 'media',
      queries: mergedQueries,
    });

    if (res.contents.length > 0) {
      return res.contents.map(formatMediaItem);
    }
    return [...MOCK_MEDIA];
  } catch (error) {
    console.warn('[microCMS] media一覧の取得に失敗したため、モックデータを返却します:', error);
    const list = [...MOCK_MEDIA];
    if (queries?.limit && queries.limit > 0) {
      return list.slice(0, queries.limit);
    }
    return list;
  }
}

export async function getMediaDetail(contentId: string, queries?: MicroCMSQueries): Promise<MediaItem | null> {
  if (!client) {
    return MOCK_MEDIA.find((item) => item.id === contentId) || null;
  }

  try {
    const item = await client.getListDetail<MicroCMSMediaRaw>({
      endpoint: 'media',
      contentId,
      queries,
    });
    return formatMediaItem(item);
  } catch (error) {
    console.warn(`[microCMS] media/${contentId} の取得に失敗したため、モックデータを検索します:`, error);
    return MOCK_MEDIA.find((item) => item.id === contentId) || null;
  }
}

