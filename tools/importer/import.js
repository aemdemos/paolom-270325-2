/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global window, WebImporter, XPathResult */
/* eslint-disable no-console */
import hero1Parser from './parsers/hero1.js';
import hero3Parser from './parsers/hero3.js';
import columns__three_columns_4Parser from './parsers/columns__three_columns_4.js';
import columns5Parser from './parsers/columns5.js';
import quote__with_attribution_7Parser from './parsers/quote__with_attribution_7.js';
import columns__three_columns_8Parser from './parsers/columns__three_columns_8.js';
import hero9Parser from './parsers/hero9.js';
import hero11Parser from './parsers/hero11.js';
import columns__three_columns_12Parser from './parsers/columns__three_columns_12.js';
import columns__three_columns_13Parser from './parsers/columns__three_columns_13.js';
import hero14Parser from './parsers/hero14.js';
import columns__three_columns_15Parser from './parsers/columns__three_columns_15.js';
import video16Parser from './parsers/video16.js';
import cards18Parser from './parsers/cards18.js';
import columns__three_columns_19Parser from './parsers/columns__three_columns_19.js';
import accordion20Parser from './parsers/accordion20.js';
import columns21Parser from './parsers/columns21.js';
import columns__three_columns_22Parser from './parsers/columns__three_columns_22.js';
import accordion23Parser from './parsers/accordion23.js';
import quote__with_attribution_24Parser from './parsers/quote__with_attribution_24.js';
import cards25Parser from './parsers/cards25.js';
import table__striped___bordered_26Parser from './parsers/table__striped___bordered_26.js';
import tabs27Parser from './parsers/tabs27.js';
import hero28Parser from './parsers/hero28.js';
import hero29Parser from './parsers/hero29.js';
import cards30Parser from './parsers/cards30.js';
import table31Parser from './parsers/table31.js';
import cards32Parser from './parsers/cards32.js';
import hero33Parser from './parsers/hero33.js';
import columns34Parser from './parsers/columns34.js';
import columns__three_columns_35Parser from './parsers/columns__three_columns_35.js';
import cards36Parser from './parsers/cards36.js';
import cards__no_images_37Parser from './parsers/cards__no_images_37.js';
import hero38Parser from './parsers/hero38.js';
import quote__with_attribution_39Parser from './parsers/quote__with_attribution_39.js';
import hero40Parser from './parsers/hero40.js';
import embed__video_41Parser from './parsers/embed__video_41.js';
import hero42Parser from './parsers/hero42.js';
import hero43Parser from './parsers/hero43.js';
import hero44Parser from './parsers/hero44.js';
import columns__three_columns_45Parser from './parsers/columns__three_columns_45.js';
import columns__three_columns_46Parser from './parsers/columns__three_columns_46.js';
import columns__three_columns_47Parser from './parsers/columns__three_columns_47.js';
import table__no_header_48Parser from './parsers/table__no_header_48.js';
import hero49Parser from './parsers/hero49.js';
import columns50Parser from './parsers/columns50.js';
import accordion51Parser from './parsers/accordion51.js';

import headerParser from './parsers/header.js';

import {
  generateDocumentPath,
  handleOnLoad,
  postTransformRules,
  preTransformRules,
} from './import.utils.js';

WebImporter.Import = {
  isEmpty: (cells) => {
    if (Array.isArray(cells)) {
      return cells.length === 0;
    } else if (typeof cells === 'object' && cells !== null) {
      return Object.keys(cells).length === 0;
    }
    return !cells;
  },
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (instances, url) => instances
    .filter((instance) => instance.url === url)
    .map(({ xpath }) => xpath),
};

const parsers = {
      'Hero 1': hero1Parser,
    'Hero 3': hero3Parser,
    'Columns (three columns) 4': columns__three_columns_4Parser,
    'Columns 5': columns5Parser,
    'Quote (with attribution) 7': quote__with_attribution_7Parser,
    'Columns (three columns) 8': columns__three_columns_8Parser,
    'Hero 9': hero9Parser,
    'Hero 11': hero11Parser,
    'Columns (three columns) 12': columns__three_columns_12Parser,
    'Columns (three columns) 13': columns__three_columns_13Parser,
    'Hero 14': hero14Parser,
    'Columns (three columns) 15': columns__three_columns_15Parser,
    'Video 16': video16Parser,
    'Cards 18': cards18Parser,
    'Columns (three columns) 19': columns__three_columns_19Parser,
    'Accordion 20': accordion20Parser,
    'Columns 21': columns21Parser,
    'Columns (three columns) 22': columns__three_columns_22Parser,
    'Accordion 23': accordion23Parser,
    'Quote (with attribution) 24': quote__with_attribution_24Parser,
    'Cards 25': cards25Parser,
    'Table (striped & bordered) 26': table__striped___bordered_26Parser,
    'Tabs 27': tabs27Parser,
    'Hero 28': hero28Parser,
    'Hero 29': hero29Parser,
    'Cards 30': cards30Parser,
    'Table 31': table31Parser,
    'Cards 32': cards32Parser,
    'Hero 33': hero33Parser,
    'Columns 34': columns34Parser,
    'Columns (three columns) 35': columns__three_columns_35Parser,
    'Cards 36': cards36Parser,
    'Cards (no images) 37': cards__no_images_37Parser,
    'Hero 38': hero38Parser,
    'Quote (with attribution) 39': quote__with_attribution_39Parser,
    'Hero 40': hero40Parser,
    'Embed (video) 41': embed__video_41Parser,
    'Hero 42': hero42Parser,
    'Hero 43': hero43Parser,
    'Hero 44': hero44Parser,
    'Columns (three columns) 45': columns__three_columns_45Parser,
    'Columns (three columns) 46': columns__three_columns_46Parser,
    'Columns (three columns) 47': columns__three_columns_47Parser,
    'Table (no header) 48': table__no_header_48Parser,
    'Hero 49': hero49Parser,
    'Columns 50': columns50Parser,
    'Accordion 51': accordion51Parser,
};

/**
* Page transformation function
*/
function transformPage(main, { inventory: { fragments = [], blocks = [] }, ...source }) {
  const { document, params: { originalURL } } = source;

  // first, get dom elements for each block for the current page
  const blockElements = blocks.map((block) => {
    const foundInstance = block.instances.find((instance) => instance.url === originalURL);
    if (foundInstance) {
      /* eslint-disable no-param-reassign */
      block.element = WebImporter.Import.getElementByXPath(document, foundInstance.xpath);
    }
    return block;
  });
  // also get all fragment elements for the current page
  const fragmentElements = fragments.flatMap((frg) => frg.instances)
    .filter((instance) => instance.url === originalURL)
    .map((instance) => WebImporter.Import.getElementByXPath(document, instance.xpath));

  // remove fragment elements
  fragmentElements.forEach((element) => {
    element.remove();
  });

  // transform all blocks using parsers
  blockElements.forEach(({ name, cluster, element }) => {
    const parserFn = parsers[`${name} ${cluster}`];

    if (!parserFn) return;

    try {
      parserFn.call(this, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${name} from cluster: ${cluster}`, e);
    }
  });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter(({ url }) => `${url}?frag=${fragment.name}` === originalURL)
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(
            ({ instances }) => instances
              .find(({ url, xpath: blockXpath }) => `${url}?frag=${fragment.name}` === originalURL && blockXpath === xpath),
          );

        if (!fragmentBlock) return;
        const { name, cluster } = fragmentBlock;
        const parserFn = parsers[`${name} ${cluster}`];
        if (!parserFn) return;

        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${name} from cluster: ${cluster} with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, url, params: { originalURL } } = source;

    // sanitize the original URL
    const sanitizedOriginalURL = new URL(originalURL).href;
    /* eslint-disable no-param-reassign */
    source.params.originalURL = sanitizedOriginalURL;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      // fetch the inventory
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        const inventoryResp = await fetch(inventoryUrl.href);
        inventory = await inventoryResp.json();
      } catch (e) {
        console.error('Failed to fetch inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    // pre-transform rules
    preTransformRules({
      root: document.body,
      document,
      url,
      publishUrl,
      originalURL,
    });

    // perform the transformation
    let main = null;
    let path = null;
    const sourceUrl = new URL(originalURL);
    const sourceParams = new URLSearchParams(sourceUrl.search);
    if (sourceParams.has('frag')) {
      // fragment transformation
      const fragName = sourceParams.get('frag');
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      main = document.body;
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source);
    }

    // post transform rules
    postTransformRules({
      root: main,
      document,
      originalURL,
    });

    return [{
      element: main,
      path,
    }];
  },
};
