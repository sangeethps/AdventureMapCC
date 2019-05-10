/* global cc, VerticalScrollMap, TileLayer,
  AdventureMapLayer: true, res
 */

AdventureMapLayer = cc.Layer.extend({
  path: 'src/data/adventuremap/',
  ctor: function () {
    'use strict';

    this._super();
    this.scrollableMap = new VerticalScrollMap();

    return true;
  },

  build: function () {
    'use strict';

    var tile_config = cc.loader.getRes(this.path + 'tile_config.json'),
      map = this.scrollableMap;

    this.initializeMap(tile_config);
    map.setAdventureMapSize();
    this.addChild(map);
  },

  initializeMap: function (tile_config) {
    'use strict';

    var i, j, k, tileData, tile, repeat,
      mapData, horLayout, visible, map, colLength;

    for (k = tile_config.length; k > 0; k--) {
      tileData = tile_config[tile_config.length - k];
      tile = tileData.tile_id;
      repeat = tileData.repeat;
      map = this.scrollableMap;

      mapData = cc.loader.getRes(this.path + tile + '.json');
      cc.spriteFrameCache.addSpriteFrames(res[tile], res[tile + '_img']);
      colLength = mapData.colLength;

      for (i = repeat; i > 0; i--) {
        for (j = 0; j < colLength; j++) {
          horLayout = new TileLayer(mapData);
          horLayout.tile_map = tile;
          horLayout.map_idx = i;
          horLayout.row_idx = j;
          horLayout.map_mpx = Math.ceil(k / 4);
          visible = this.getMapVisibility(k, i);
          horLayout.setVisible(visible);
          horLayout.initTilesInLayer(mapData, map);
          map.addChild(horLayout);
        }
      }
    }
  },

  getMapVisibility: function (cycle, repeat) {
    'use strict';

    // will change the function to show visible area of the current max_ms_no
    return cycle < 2 && repeat < 3;
  },

  createMapWithTile: function (index) {
    'use strict';

    var horLayout, mapData,
      self = this,
      map = self.scrollableMap;

    horLayout = map.map_children[index];
    horLayout.setVisible(true);
    mapData = cc.loader.getRes(self.path + horLayout.tile_map + '.json');
    horLayout.initTilesInLayer(mapData, map);
  }
});
