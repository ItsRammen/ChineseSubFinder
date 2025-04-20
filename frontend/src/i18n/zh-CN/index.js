export default {
  appName: 'ChineseSubFinder',
  // Add Chinese translations here
  failed: '操作失败',
  success: '操作成功',

  setup: {
    welcome: '欢迎使用 ChineseSubFinder！',
    step1Title: '创建管理账号',
    step2Title: '电影、连续剧目录设置',
    step3Title: '选择媒体服务器',
    step4Title: 'Emby 设置',
    dockerWarningTitle: '请修改相关配置后继续',
    dockerWarningMessage: '软件运行在 Docker 中，请将电影和电视剧目录修改为 <b>/media</b> 下的目录，否则可能会因为权限问题导致无法正确的加载媒体库',
    successMessage: '初始化完成',

    adminForm: {
      username: '用户名',
      usernameLabel: '输入您的用户名',
      usernameHint: '用户名必须在3-16个字符以内，只能包含字母、数字、下划线',
      usernameRule: '用户名必须在3-16个字符以内，只能包含字母、数字、下划线',
      password: '密码',
      passwordLabel: '输入您的密码',
      passwordHint: '密码必须在6-30位之间',
      passwordRule: '密码必须在6-30位之间，且只能由字母、数字、特殊符号组成',
      confirmPasswordLabel: '确认密码'
    },
    scanForm: {
      movieFoldersTitle: '电影目录',
      movieFolderLabel: '电影目录{index}',
      movieFolderHint: '输入需要扫描的电影文件夹目录',
      seriesFoldersTitle: '连续剧目录',
      seriesFolderLabel: '连续剧目录{index}',
      seriesFolderHint: '输入需要扫描的连续剧文件夹目录'
    },
    mediaServerForm: {
      none: '无'
    },
    embyForm: {
      urlLabel: 'Emby的内网URL',
      apiKeyLabel: 'API Key',
      limitCountLabel: '获取最多的剧集数量',
      skipWatchedLabel: '是否跳过已观看的',
      autoMatchImdbLabel: '自动匹配IMDB ID'
    }
  },

  buttons: {
    finish: '完成',
    next: '下一步',
    previous: '上一步',
    ok: '确定',
    add: '新增',
    delete: '删除'
  },

  validation: {
    required: '请输入{field}',
    passwordsDoNotMatch: '两次输入的密码不一致',
    cannotBeEmpty: '不能为空',
    invalidUrl: '请输入正确的URL',
    mustBeInteger: '必须是整数'
  },

  settings: {
    jobRunningWarning: '任务进程运行中，不能更改配置',
    gotoOverviewButton: '去总览页面停止',
    tabs: {
      basic: '基础配置',
      advanced: '进阶配置',
      subSource: '字幕源设置',
      emby: 'Emby配置',
      development: '开发人员配置',
      experiment: '实验室'
    },
    basic: {
      scanTimingTitle: '字幕扫描时机',
      scanIntervalLabel: '扫描的间隔',
      scanIntervalCaption: '间隔小时数',
      scanSpecTimeLabel: '指定扫描时间',
      scanSpecTimeCaption: '选择每天固定时间点',
      scanSpecTimeRule: '最多选择4个时间点',
      scanCustomRuleLabel: '自定义规则',
      scanCustomRuleCaption1: '详细规则参考',
      scanCustomRuleLink: 'robfig/cron 文档',
      noScanLabel: '不扫描',
      performanceTitle: '设备性能选择',
      performanceWeak: '弱鸡（1线程）',
      performanceNormal: '一般（3线程）',
      performanceStrong: '超猛（6线程）',
      movieDirsTitle: '电影的目录',
      movieDirPlaceholder: '/media/电影',
      seriesDirsTitle: '连续剧的目录',
      seriesDirPlaceholder: '/media/连续剧',
      scanIntervalOptions: {
        '4h': '每4小时',
        '5h': '每5小时',
        '6h': '每6小时',
        '7h': '每7小时',
        '8h': '每8小时',
        '9h': '每9小时',
        '10h': '每10小时'
      },
      scanSpecTimeOptions: {
        '0': '00:00',
        '1': '01:00',
        '2': '02:00',
        '3': '03:00',
        '4': '04:00',
        '5': '05:00',
        '6': '06:00',
        '7': '07:00',
        '8': '08:00',
        '9': '09:00',
        '10': '10:00',
        '11': '11:00',
        '12': '12:00',
        '13': '13:00',
        '14': '14:00',
        '15': '15:00',
        '16': '16:00',
        '17': '17:00',
        '18': '18:00',
        '19': '19:00',
        '20': '20:00',
        '21': '21:00',
        '22': '22:00',
        '23': '23:00'
      }
    },
    advanced: {
      proxy: {
        useProxyLabel: '是否使用代理',
        useProxyCaption: '支持HTTP代理',
        protocolLabel: '协议',
        serverLabel: '代理服务器',
        portLabel: '代理端口',
        localPortLabel: '本地端口',
        authLabel: '账号认证',
        usernameLabel: '账号',
        passwordLabel: '密码',
        testButtonLabel: '测试代理服务',
        protocolOptions: {
          http: 'HTTP',
          https: 'HTTPS',
          socks5: 'SOCKS5'
        }
      },
      debugModeLabel: '调试模式',
      saveCacheLabel: '保存整季的缓存字幕',
      subPriorityTitle: '字幕格式下载优先级',
      subPriorityOptions: {
        'ass&srt': 'ASS & SRT',
        'srt&ass': 'SRT & ASS'
      },
      subNamingTitle: '字幕保存的命名格式',
      subNamingOptions: {
        normal: {
          label: '常规（兼容性更好）',
          description: 'AAA.zh.ass or AAA.zh.default.ass。'
        },
        emby: {
          label: 'Emby',
          description: 'AAA.chinese(简英,subhd).ass or AAA.chinese(简英,xunlei).default.ass。'
        },
        video: {
          label: '和视频文件名一致（无语言后缀）',
          description: '无语言描述后缀，AAA.ass or AAA.srt'
        }
      },
      subNamingWarning: '修改此选项后需要重启容器，启动阶段会对所有字幕的做格式调整，耗时可能较长',
      skipChineseMovieLabel: '跳过中文电影',
      skipChineseSeriesLabel: '跳过中文连续剧',
      saveMultiSubLabel: '保存多字幕',
      saveMultiSubCaption: '每个视频下面保存每个网站找到的最佳字幕，需要选择Emby格式',
      subSourcesTitle: '字幕源设置',
      subSourceDailyLimit: '每日下载次数限制：{limit}',
      queue: {
        title: '队列设置',
        maxRetryLabel: '最大重试次数',
        maxRetryHint: '单个任务失败后，最大重试次数，超过后会降一级',
        timeoutLabel: '任务的超时时间',
        intervalLabel: '下载任务之间的间隔时间',
        intervalHint: '防止频率太高触发防爬检测',
        expirationLabel: '下载时效（天）',
        expirationHint: '视频创建时间在此时间内，才下载，否则标记为失败',
        internalSubExpirationLabel: '有内置字幕的视频下载时效',
        internalSubExpirationHint: '如果创建了 x 天，且有内置的中文字幕，那么也不进行下载了',
        retryIntervalLabel: '单个任务失败后，重新下载的最小间隔（小时）',
        publicIpCheckSiteLabel: '检查公网IP的目标网站',
        publicIpCheckSiteHint: '目标网站必须直接返回ip字符串，不需要额外解析。多个站点用 ;（英文分号） 分割',
        publicIpCheckSiteWarning: '默认内置几个检查ip的网站，默认站点失效后才需要手动设置。内置站点列表： https://myip.biturl.top/;https://ip4.seeip.org/;https://ipecho.net/plain;https://api-ipv4.ip.sb/ip; https://api.ipify.org/;http://myexternalip.com/raw'
      },
      cacheTtlTitle: '下载缓存过期时间设置',
      customExtTitle: '自定义视频扩展名',
      customExtCaption: '原生支持mp4、mkv、rmvb、iso',
      fixTimelineLabel: '自动校正字幕时间轴',
      tmdb: {
        enableLabel: '启用TMDB API',
        warning: '国内访问 TMDB API 可能需要代理。目前程序对接的是 TMDB v3 的接口，请使用 v3 的 ApiKey，否则会出问题。',
        apiKeyLabel: '填写 TMDB ApiKey',
        useAlternateUrlLabel: '使用备用的 TMDB API 地址',
        useAlternateUrlTitle: '如果连接不上 TMDB API，可以尝试勾选这个选项'
      },
      subSource: {
        assrt: {
          title: 'Assrt（https://assrt.net/api/doc）',
          captionLinks: '注册：https://assrt.net/user/register.xml，用户面板：https://assrt.net/usercp.php',
          captionItem1: '一般用户是 5次/min 的 API 请求限制',
          captionItem2: '建议设置完 Token 后，重启程序或者容器！',
          captionItem3: '搜索字幕效果未知，如果不用就关闭即可',
          captionItem4: '建议配合"保存多字幕"的选项服用（如果你使用 Emby 的话）',
          tokenPlaceholder: '填写你的API Token',
          tokenLabel: 'Assrt API Token'
        },
        subtitleBest: {
          title: 'SubtitleBest',
          captionLinks: '注册：用telegramBot注册，https://t.me/SubtitleBestBot，使用 /help 指令会有提示',
          captionItem1: '此接口依赖于 IMDB ID 进行搜索，会依赖于公用的信息查询接口（获取 TMDB 、IMDB 等信息，如果使用人数过多，请配置自己的 TMDB API 使用）。',
          captionItem2: '一般用户是每天 50 次下载限制。',
          captionItem3: '建议设置完 ApiKey 后，重启程序或者容器！',
          apiKeyPlaceholder: '填写你的ApiKey',
          apiKeyLabel: 'SubtitleBest ApiKey'
        }
      }
    },
    emby: {
      enableLabel: '是否开启',
      urlLabel: 'Emby的内网URL',
      apiKeyLabel: 'API Key',
      limitCountLabel: '获取最多的剧集数量',
      skipWatchedLabel: '是否跳过已观看的',
      autoMatchImdbLabel: '自动匹配IMDB ID'
    },
    development: {
      interfaceNotificationLabel: '接口失效通知',
      interfaceNotificationCaption: '项目维护人员使用，一般人员无需关心',
      barkServerAddressLabel: 'Bark 服务器地址',
      barkServerAddressPlaceholder: '例如：https://api.day.app/your_key'
    },
    experiment: {
      autoEncode: {
        title: '自动转换字幕文件编码',
        caption: '自动转换到目标编码，如果不是特殊情况，不建议开启，仅对新下载字幕生效',
        options: {
          '0': '不转换',
          '1': 'UTF-8',
          '2': 'GBK'
        }
      },
      chsChtConvert: {
        title: '简、繁字幕互转功能',
        caption: '需要开启"自动转换字幕文件编码"功能，并设置为转码"UTF-8"，否则无法启用和生效',
        options: {
          '0': '不转换',
          '1': '繁 -> 简',
          '2': '简 -> 繁'
        }
      },
      remoteChrome: {
        title: '远程Chrome',
        caption: '本功能能够将本程序使用的 Chrome 操作移到一个有算力和资源的硬件上，这样部署本程序的资源要求进一步降低。<br /> 需要自行参看<a class=\"text-primary\" href=\"https://go-rod.github.io/i18n/zh-CN/#/custom-launch?id=远程管理启动器\" target=\"_blank\">https://go-rod.github.io/i18n/zh-CN/#/custom-launch?id=远程管理启动器</a>文档部署实验性功能，可用性和稳定性存疑，未必会继续支持更新。除非 go-rod 更新。',
        dockerUrlLabel: '远程 Docker 地址',
        dockerUrlPlaceholder: 'ws://192.168.xx.xx:9222',
        adblockPathLabel: '远程 Docker 中的 ADBlocker 目录',
        adblockPathPlaceholder: '/mnt/share/adblock1',
        userDataDirLabel: '远程 Docker 中的缓存文件夹目录',
        userDataDirPlaceholder: '/mnt/share/tmp'
      },
      localChrome: {
        title: '本地Chrome',
        caption: '如果本程序能够自动下载 Chrome 就不建议自己制定 Chrome 版本，因为如果本程序更新了， Chrome 也会自动下载最新的，但是你指定的，我是没法更新的，有问题也只有你自己去手动更新 Chrome。建 议还是优先还是解决网络问题去下载 Chrome。下载 Chrome 是又 go-rod 进行的，有问题也只能去提 issues。注意以下几点： <div><ol> <li> 如果是 Docker 用户，推荐映射你解压后的 /volume1/docker/chinesesubfinder/Chrome 文件 夹 到 /app/cache/Plugin/Chrome 文件夹中，那么你需要填写的 Chrome 容器内的完整路径应 该是（举例，按自己下载的 Chrome 来改）: /app/cache/Plugin/Chrome/chrome </li> <li>如果是 Windows 用户，那么就是你 Chrome.exe 的完整路径</li> <li>Chrome 版本不要太低</li> <li>请确认指定的chrome和对应平台、CPU架构一致</li> </ol></div>',
        pathLabel: 'Chrome(.exe) 的完整路径',
        pathPlaceholder: '/your/chrome/path/chrome.exe'
      },
      apiKey: {
        title: 'API key',
        caption: '本程序提供一些接口给开发者使用，通过API key鉴权，具体参见 <a href=\"https://github.com/ChineseSubFinder/ChineseSubFinder/blob/docs/DesignFile/ApiKey%E8%AE%BE%E8%AE%A1/ApiKey%E8%AE%BE%E8%AE%A1.md\" class=\"text-primary\" target=\"_blank\">开发文档</a>',
        regenerateButton: '重新生成密钥'
      }
    },
    library: {
      dialogTitle: '更新缓存',
      dialogMessage: '刷新缓存并不会自动提交下载字幕的任务，仅仅是方便手动选择一个视频去下载字幕。这个是一个长耗时任务，请在有手动的需求下操作。暂时不支持动态更新缓存，需要手动执行完整的缓存刷新操作。',
      refreshMediaServerSubs: {
        buttonLabel: '更新媒体服务器字幕',
        dialogTitle: '更新媒体服务器字幕',
        dialogMessage: '此操作会刷新最近的10000个视频的字幕，可能需要一段时间才能生效。提交后会触发媒体服务器的刷新，异步操作，无需频繁点击触发。服务器刷新生效也需要看各自的媒体文件数量。',
        successMessage: '刷新成功'
      },
      uploadSubtitle: {
        statusUploading: '字幕上传中...',
        buttonLabel: '上传本地字幕',
        buttonTitle: '上传本地字幕',
        successMessage: '字幕上传成功。如果设置开启了"自动校正时间轴"，处理需要一些时间，请耐心等待'
      },
      ignoreVideo: {
        buttonTitleLocked: '当前视频已锁定，不进行字幕下载',
        buttonTitleUnlocked: '点击锁定视频，不进行字幕下载',
        lockDialogMessage: '确定要锁定该视频，不进行字幕下载吗？',
        unlockDialogMessage: '确定要解锁该视频吗？'
      },
      searchSubtitle: {
        buttonTitle: '字幕搜索',
        dialogTitle: '字幕搜索',
        dialogWarning: '下载字幕包是在浏览器端进行处理的，下载过程中请不要关闭页面',
        tabSubtitleBest: 'Subtitle.Best API',
        tabManual: '手动搜索'
      }
    }
  },

  units: {
    seconds: '秒',
    hours: '小时',
    days: '天'
  }
  // Add more Chinese translations here
} 