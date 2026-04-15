Component({
  data: {
    selected: 0,
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        icon: "🌟"
      },
      {
        pagePath: "pages/history/history",
        text: "记录",
        icon: "📜"
      },
      {
        pagePath: "pages/profile/profile",
        text: "我的",
        icon: "👑"
      }
    ]
  },
  attached() {
    console.log('custom-tab-bar attached');
  },
  methods: {
    switchTab(e) {
      const index = e.currentTarget.dataset.index;
      console.log('switchTab clicked, index:', index);
      const item = this.data.list[index];
      if (!item) {
        console.error('Tab item not found at index:', index);
        return;
      }
      const path = item.pagePath;
      console.log('switching to path:', path);
      wx.switchTab({
        url: '/' + path,
        success: () => {
          console.log('switchTab success');
        },
        fail: (err) => {
          console.error('switchTab failed:', err);
        }
      });
    }
  }
});
