window.APP_CONFIG = {
  appTitle: '四情境平均分派問卷',
  surveySubtitle: '一個網站、四個情境、共同題目、平均分派樣本',
  researchNote: '此問卷採匿名方式蒐集，僅供學術研究使用。',
  likertLabels: ['非常不同意', '不同意', '普通', '同意', '非常同意'],
  backend: {
    // 重要：部署 Google Apps Script 後，把 Web App URL 貼到這裡
    googleScriptUrl: 'https://script.google.com/macros/s/AKfycbxmeCqO6qwjMS42y_ilT2Cupu3S6a0DvpiUBDdPwiQfpv7z134XyJPYAp4GRpWHGXQa/exec',
    enabled: true
  },
  storagePrefix: 'fourConditionSurvey_v1'
};
