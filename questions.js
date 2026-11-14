window.SURVEY_PAGES = [
  {
    id: 'consent',
    type: 'consent',
    title: '研究說明與填答同意',
    description: '親愛的參與者您好，</br></br>
非常感謝您參與此研究，並協助填寫本研究問卷。</br>本研究問卷參與者為18歲以上有採購豬肉的消費者。問卷填寫時間不超過十分鐘。請詳閱問卷正式開始處的填寫說明，答案並無對錯，請依照您真實的情況詳實填答即可。</br>
這是一份由國科會計畫補助的研究。您所提供的資料由本計劃主持人作為國科會研究計畫結果彙整及報告撰寫用。所有的資料將不會洩漏個資，資料僅供學術用途，不做他用，敬請安心填答。資料存放研究者臺南大學榮譽校區研究室電腦硬碟，並於計畫執行結束保存五年後刪除銷毀(121年7月)，若您有興趣瞭解研究結果，研究執行完後，將可提供您摘要報告。</br>
參與本研究填寫問卷預期不會對您的權益造成損害，感受到不適或心理、情緒上的負向感受的可能性較低。如您在填寫過程中感到不適，可以隨時停止作答或退出問卷。因問卷採不記名作答、無法辨識，恕無法刪除已提供的資料。
本問卷採匿名方式蒐集，資料僅供學術研究使用。點擊下一步代表您已閱讀並同意填答。</br>
<right>國立臺南大學 經營與管理系 </right></br><right>溫丹瑋 助理教授 敬上 </right></br><right>marianwen@gm2.nutn.edu.tw </right></br>
',
    submitLabel: '我已閱讀並同意，開始填答',
    questions: []
  },
  {
    id: 'scenario',
    type: 'scenario',
    title: '請先閱讀以下描述',
    description: '系統會自動分派 A/B/C/D 其中一個情境。本頁內容會依分派結果切換。',
    submitLabel: '我已閱讀情境，開始作答',
    questions: []
  },
  {
    id: 'scale-1',
    title: '請回想您剛才閱讀的企業對智慧養豬科技的說明，接著評估，在閱讀這些內容後，有多大程度同意以下的敘述。',
    description: '1 非常不同意｜2 不同意｜3 普通｜4 同意｜5 非常同意',
    questions: [
      { id: 'Q1', type: 'likert', text: '我根據這些資訊建立對智慧養豬科技的理解。' },
      { id: 'Q2', type: 'likert', text: '我從這些資訊中得到對智慧養豬科技的新洞察。' },
      { id: 'Q3', type: 'likert', text: '我根據這些資訊理解智慧養豬科技的意義。' },
      { id: 'Q4', type: 'likert', text: '我根據這些資訊對智慧養豬科技的運作方式形成有系統的整體理解。 ' }
      { id: 'Q5', type: 'likert', text: '我能根據這些資訊理解智慧養豬科技的不同面向如何相互關聯。 ' }
      { id: 'Q6', type: 'likert', text: '我能以自己可以理解的方式，整理這些智慧養豬科技的相關資訊。 ' }
      { id: 'Q7', type: 'likert', text: '我能根據這些資訊，補足自己對智慧養豬科技理解上的缺口。' },
      { id: 'Q8', type: 'likert', text: '這些資訊降低了我對智慧養豬科技的困惑。' },
      { id: 'Q9', type: 'likert', text: '這些資訊降低了我對智慧養豬科技內涵的不確定感。' },
      { id: 'Q10', type: 'likert', text: '這些資訊降低了我對智慧養豬科技的模糊感。' }
      { id: 'Q11', type: 'likert', text: '我能將這些資訊與自己原先對智慧養豬科技的認識建立連結。' },
      { id: 'Q12', type: 'likert', text: '我將這些資訊與自己原先對養豬的認識建立連結。' },
      { id: 'Q13', type: 'likert', text: '我從這些資訊中理解智慧養豬科技與不同利害關係人（如養豬業者、消費者及企業）之間的關聯。' },
      { id: 'Q14', type: 'likert', text: '我能根據所提供的資訊，建立智慧養豬科技與食品供應鏈不同環節之間的關聯。' }
    ]
  },
  {
    id: 'scale-2',
    title: '請回想您剛才閱讀的企業對智慧養豬科技的說明，並評估您有多大程度同意以下對於這些內容以及您個人態度的敘述。',
    description: '1 非常不同意｜2 不同意｜3 普通｜4 同意｜5 非常同意',
    questions: [
      { id: 'Q15', type: 'likert', text: '所提供的智慧養豬科技資訊具有充實的內容。' },
      { id: 'Q16', type: 'likert', text: '所提供的智慧養豬科技資訊對我有所幫助。' },
      { id: 'Q17', type: 'likert', text: '所提供的智慧養豬科技資訊對我具有價值。' },
      { id: 'Q18', type: 'likert', text: '所提供的智慧養豬科技資訊具有說服力。' }
      { id: 'Q19', type: 'likert', text: '如果認識的人推薦一項新科技，我通常會將他們的推薦納入考量。' },
      { id: 'Q20', type: 'likert', text: '當我接觸不熟悉的科技時，我會參考其他人的看法來判斷如何評價它。' },
      { id: 'Q21', type: 'likert', text: '知道其他人支持一項新科技，會影響我對它的判斷。' },
      { id: 'Q22', type: 'likert', text: '在評價不熟悉的科技時，我經常依賴其他人的意見。' }
      { id: 'Q23', type: 'likert', text: '對我而言，自己對新科技的看法與其他人一致是重要的。' }
    ]
  },
 {
    id: 'scale-3',
    title: '請回想您剛才閱讀的企業對智慧養豬科技的說明，並評估您有多大程度同意以下對於該科技的敘述。',
    description: '1 非常不同意｜2 不同意｜3 普通｜4 同意｜5 非常同意',
    questions: [
      { id: 'Q24', type: 'likert', text: '整體而言，我對智慧養豬科技抱持正面的評價。' },
      { id: 'Q25', type: 'likert', text: '整體而言，我認為智慧養豬科技是好的。' },
      { id: 'Q26', type: 'likert', text: '整體而言，我喜歡智慧養豬科技。' },
      { id: 'Q27', type: 'likert', text: '我喜歡智慧養豬科技這個創新構想。' }
      { id: 'Q28', type: 'likert', text: '我認為智慧養豬科技是值得肯定的。' },
    ]
  },
  {
    id: 'demographics',
    title: '最後一部分：基本資料',
    description: '以下題目可依研究需要增減。題目 id 要同步填到 Apps Script 的 QUESTION_IDS。',
    submitLabel: '送出問卷',
    questions: [
      { id: 'gender', type: 'choice', text: '請問您的性別為何？', options: ['男性', '女性', '其他／不便透露'] },
      { id: 'age', type: 'choice', text: '請問您的年齡區間為何？', options: ['18歲以下', '18–24歲', '25–34歲', '35歲以上'] },
      { id: 'experience', type: 'choice', text: '請問您是否曾有類似經驗？', options: ['有', '沒有'] }
    ]
  }
];
