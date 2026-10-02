import { SiteContent } from '../types';
import { DEFAULT_SITE_CONTENT } from '../data/defaultContent';

const CMS_STORAGE_KEY = 'gwm_cms_content_v1';
const ADMIN_AUTH_KEY = 'gwm_admin_authenticated';

export function loadSiteContent(): SiteContent {
  try {
    const raw = localStorage.getItem(CMS_STORAGE_KEY);
    if (!raw) return DEFAULT_SITE_CONTENT;
    const parsed = JSON.parse(raw);
    // Ensure all required fields exist by deep-merging with defaults
    return {
      ...DEFAULT_SITE_CONTENT,
      ...parsed,
      about: {
        ...DEFAULT_SITE_CONTENT.about,
        ...(parsed.about || {}),
        ceo: {
          ...DEFAULT_SITE_CONTENT.about.ceo,
          ...(parsed.about?.ceo || {}),
        },
        commitments: parsed.about?.commitments || DEFAULT_SITE_CONTENT.about.commitments,
      },
    };
  } catch (error) {
    console.error('Failed to load site content from localStorage:', error);
    return DEFAULT_SITE_CONTENT;
  }
}

export function saveSiteContent(content: SiteContent): boolean {
  try {
    const toSave: SiteContent = {
      ...content,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(toSave));
    window.dispatchEvent(new CustomEvent('gwm-cms-content-changed', { detail: toSave }));
    return true;
  } catch (error) {
    console.error('Failed to save site content to localStorage:', error);
    return false;
  }
}

export function resetSiteContent(): SiteContent {
  try {
    localStorage.removeItem(CMS_STORAGE_KEY);
    window.dispatchEvent(
      new CustomEvent('gwm-cms-content-changed', { detail: DEFAULT_SITE_CONTENT })
    );
    return DEFAULT_SITE_CONTENT;
  } catch (error) {
    console.error('Failed to reset site content:', error);
    return DEFAULT_SITE_CONTENT;
  }
}

export function getAdminAuthStatus(): boolean {
  try {
    return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setAdminAuthStatus(isAuth: boolean): void {
  try {
    if (isAuth) {
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
    } else {
      sessionStorage.removeItem(ADMIN_AUTH_KEY);
    }
  } catch {
    // ignore
  }
}
