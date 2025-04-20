export default {
  appName: 'ChineseSubFinder',
  // Add English translations here
  failed: 'Action failed',
  success: 'Action was successful',
  successMessage: 'Initialization complete',

  buttons: {
    finish: 'Finish',
    next: 'Next',
    previous: 'Previous',
    ok: 'OK',
    add: 'Add',
    delete: 'Delete',
    cancel: 'Cancel'
  },

  setup: {
    // ... existing code ...
    successMessage: 'Initialization complete',

    adminForm: {
      username: 'Username',
      usernameLabel: 'Enter your username',
      usernameHint: 'Username must be 3-16 characters, letters, numbers, underscores only',
      usernameRule: 'Username must be 3-16 characters long and contain only letters, numbers, or underscores.',
      password: 'Password',
      passwordLabel: 'Enter your password',
      passwordHint: 'Password must be 6-30 characters long',
      passwordRule: 'Password must be 6-30 characters long and can only contain letters, numbers, or special symbols.',
      confirmPasswordLabel: 'Confirm password'
    },
    scanForm: {
      movieFoldersTitle: 'Movie Folders',
      movieFolderLabel: 'Movie Folder {index}',
      movieFolderHint: 'Enter the movie folder directory to scan',
      seriesFoldersTitle: 'Series Folders',
      seriesFolderLabel: 'Series Folder {index}',
      seriesFolderHint: 'Enter the series folder directory to scan'
    },
    mediaServerForm: {
      none: 'None'
    },
    embyForm: {
      urlLabel: 'Emby Internal URL',
      apiKeyLabel: 'API Key',
      limitCountLabel: 'Max Episode Count to Fetch',
      skipWatchedLabel: 'Skip Watched Episodes?',
      autoMatchImdbLabel: 'Auto Match IMDB ID'
    }
  },

  validation: {
    required: '{field} is required',
    passwordsDoNotMatch: 'Passwords do not match',
    cannotBeEmpty: 'Cannot be empty',
    invalidUrl: 'Please enter a valid URL',
    mustBeInteger: 'Must be an integer'
  },

  settings: {
    jobRunningWarning: 'Task process is running, configuration cannot be changed',
    gotoOverviewButton: 'Go to Overview page to stop',
    tabs: {
      basic: 'Basic Settings',
      advanced: 'Advanced Settings',
      subSource: 'Subtitle Source Settings',
      emby: 'Emby Settings',
      development: 'Developer Settings',
      experiment: 'Experimental'
    },
    basic: {
      scanTimingTitle: 'Subtitle Scan Timing',
      scanIntervalLabel: 'Scan Interval',
      scanIntervalCaption: 'Interval in hours',
      scanSpecTimeLabel: 'Specific Scan Time',
      scanSpecTimeCaption: 'Select fixed daily time points',
      scanSpecTimeRule: 'Select up to 4 time points',
      scanCustomRuleLabel: 'Custom Rule',
      scanCustomRuleCaption1: 'Refer to',
      scanCustomRuleLink: 'robfig/cron documentation',
      noScanLabel: 'Do Not Scan',
      performanceTitle: 'Device Performance Selection',
      performanceWeak: 'Weak (1 thread)',
      performanceNormal: 'Normal (3 threads)',
      performanceStrong: 'Strong (6 threads)',
      movieDirsTitle: 'Movie Directories',
      movieDirPlaceholder: '/media/movies',
      seriesDirsTitle: 'Series Directories',
      seriesDirPlaceholder: '/media/series',
      scanIntervalOptions: {
        '4h': 'Every 4 hours',
        '5h': 'Every 5 hours',
        '6h': 'Every 6 hours',
        '7h': 'Every 7 hours',
        '8h': 'Every 8 hours',
        '9h': 'Every 9 hours',
        '10h': 'Every 10 hours'
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
        useProxyLabel: 'Use Proxy',
        useProxyCaption: 'Supports HTTP proxy',
        protocolLabel: 'Protocol',
        serverLabel: 'Proxy Server',
        portLabel: 'Proxy Port',
        localPortLabel: 'Local Port',
        authLabel: 'Account Authentication',
        usernameLabel: 'Username',
        passwordLabel: 'Password',
        testButtonLabel: 'Test Proxy Service',
        protocolOptions: {
          http: 'HTTP',
          https: 'HTTPS',
          socks5: 'SOCKS5'
          // Add other protocols if needed
        }
      },
      debugModeLabel: 'Debug Mode',
      saveCacheLabel: 'Save Full Season Cache Subtitles',
      subPriorityTitle: 'Subtitle Format Download Priority',
      subPriorityOptions: {
        'ass&srt': 'ASS & SRT',
        'srt&ass': 'SRT & ASS'
        // Add other priorities if needed
      },
      subNamingTitle: 'Subtitle Saving Naming Format',
      subNamingOptions: {
        normal: { // Corresponds to SUB_NAME_FORMAT_NORMAL constant
          label: 'Normal',
          description: 'Better compatibility, AAA.zh.ass or AAA.zh.default.ass.'
        },
        emby: { // Corresponds to SUB_NAME_FORMAT_EMBY constant
          label: 'Emby',
          description: 'AAA.chinese(简英,subhd).ass or AAA.chinese(简英,xunlei).default.ass.'
        },
        video: { // Corresponds to SUB_NAME_VIDEO constant
          label: 'Same as Video File Name',
          description: 'No language description suffix, AAA.ass or AAA.srt'
        }
      },
      subNamingWarning: 'After modifying this option, the container needs to be restarted. The formatting adjustment for all subtitles during startup may take a long time.',
      skipChineseMovieLabel: 'Skip Chinese Movies',
      skipChineseSeriesLabel: 'Skip Chinese Series',
      saveMultiSubLabel: 'Save Multiple Subtitles',
      saveMultiSubCaption: 'Save the best subtitle found from each website under each video, requires Emby format selection',
      subSourcesTitle: 'Subtitle Source Settings',
      subSourceDailyLimit: 'Daily download limit: {limit}',
      queue: {
        title: 'Queue Settings',
        maxRetryLabel: 'Max Retry Times',
        maxRetryHint: 'Maximum retry times after a single task fails, will be demoted after exceeding',
        timeoutLabel: 'Task Timeout',
        intervalLabel: 'Interval Between Download Tasks',
        intervalHint: 'Prevent anti-crawling detection due to high frequency',
        expirationLabel: 'Download Validity (Days)',
        expirationHint: 'Download only if the video creation time is within this period, otherwise mark as failed',
        internalSubExpirationLabel: 'Download Validity for Videos with Internal Subs',
        internalSubExpirationHint: 'If created x days ago and has internal Chinese subtitles, do not download',
        retryIntervalLabel: 'Min Interval for Redownload After Failure (Hours)',
        publicIpCheckSiteLabel: 'Target Website for Checking Public IP',
        publicIpCheckSiteHint: 'Target website must return IP string directly, no extra parsing needed. Separate multiple sites with ; (semicolon)',
        publicIpCheckSiteWarning: 'Several IP checking websites are built-in by default. Manual setting is only needed after default sites fail. Built-in list: https://myip.biturl.top/;https://ip4.seeip.org/;https://ipecho.net/plain;https://api-ipv4.ip.sb/ip; https://api.ipify.org/;http://myexternalip.com/raw'
      },
      cacheTtlTitle: 'Download Cache Expiration Time Setting',
      customExtTitle: 'Custom Video Extensions',
      customExtCaption: 'Natively supports mp4, mkv, rmvb, iso',
      fixTimelineLabel: 'Auto Correct Subtitle Timeline',
      tmdb: {
        enableLabel: 'Enable TMDB API',
        warning: 'Accessing TMDB API from China may require a proxy. The program currently interfaces with TMDB v3. Please use a v3 ApiKey, otherwise issues will occur.',
        apiKeyLabel: 'Enter TMDB ApiKey',
        useAlternateUrlLabel: 'Use Alternate TMDB API Address',
        useAlternateUrlTitle: 'If you cannot connect to the TMDB API, try checking this option'
      },
      subSource: {
        assrt: {
          title: 'Assrt (https://assrt.net/api/doc)',
          captionLinks: 'Register: https://assrt.net/user/register.xml, User Panel: https://assrt.net/usercp.php',
          captionItem1: 'General users have an API request limit of 5 times/min',
          captionItem2: 'It is recommended to restart the program or container after setting the Token!',
          captionItem3: 'Subtitle search effect is unknown, disable if not used',
          captionItem4: 'Recommended to use with the \"Save Multiple Subtitles\" option (if you use Emby)',
          tokenPlaceholder: 'Enter your API Token',
          tokenLabel: 'Assrt API Token'
        },
        subtitleBest: {
          title: 'SubtitleBest',
          captionLinks: 'Register: Use Telegram Bot, https://t.me/SubtitleBestBot, use /help command for hints',
          captionItem1: 'This interface relies on IMDB ID for searching and depends on public information query interfaces (getting TMDB, IMDB info, etc.). If usage is high, please configure your own TMDB API.',
          captionItem2: 'General users have a daily download limit of 50 times.',
          captionItem3: 'It is recommended to restart the program or container after setting the ApiKey!',
          apiKeyPlaceholder: 'Enter your ApiKey',
          apiKeyLabel: 'SubtitleBest ApiKey'
        }
      }
    },
    emby: {
      enableLabel: 'Enable',
      urlLabel: 'Emby Internal URL',
      apiKeyLabel: 'API Key',
      limitCountLabel: 'Max Episode Count to Fetch',
      skipWatchedLabel: 'Skip Watched Episodes?',
      autoMatchImdbLabel: 'Auto Match IMDB ID'
      // Add other Emby-specific settings if needed
    },
    development: {
      interfaceNotificationLabel: 'Interface Failure Notification',
      interfaceNotificationCaption: 'Used by project maintainers, general users need not worry',
      barkServerAddressLabel: 'Bark Server Address',
      barkServerAddressPlaceholder: 'e.g., https://api.day.app/your_key'
      // Add other Developer settings if needed
    },
    experiment: {
      autoEncode: {
        title: 'Auto Convert Subtitle File Encoding',
        caption: 'Auto convert to target encoding. Not recommended unless necessary, only affects newly downloaded subtitles.',
        options: {
          // Assuming DESC_ENCODE_TYPE_NAME_MAP keys are 0, 1, etc.
          '0': 'Original',
          '1': 'UTF-8',
          '2': 'GBK'
          // Add other encodings based on DESC_ENCODE_TYPE_NAME_MAP
        }
      },
      chsChtConvert: {
        title: 'Simplified/Traditional Chinese Subtitle Conversion',
        caption: 'Requires \"Auto Convert Subtitle File Encoding\" to be enabled and set to \"UTF-8\", otherwise cannot be enabled or effective.',
        options: {
          // Assuming AUTO_CONVERT_LANG_NAME_MAP keys are 0, 1, 2
          '0': 'None',
          '1': 'Traditional -> Simplified',
          '2': 'Simplified -> Traditional'
          // Add other conversion types if needed
        }
      },
      remoteChrome: {
        title: 'Remote Chrome',
        caption: 'This feature allows moving Chrome operations used by this program to hardware with more resources, further reducing resource requirements for deployment. <br /> Refer to the <a class="text-primary" href="https://go-rod.github.io/#/custom-launch?id=launcher-managed-remotely" target="_blank">https://go-rod.github.io/#/custom-launch?id=launcher-managed-remotely</a> documentation to deploy this experimental feature. Availability and stability are questionable, and updates may not be supported unless go-rod updates.',
        dockerUrlLabel: 'Remote Docker Address',
        dockerUrlPlaceholder: 'ws://192.168.xx.xx:9222',
        adblockPathLabel: 'ADBlocker Directory in Remote Docker',
        adblockPathPlaceholder: '/mnt/share/adblock1',
        userDataDirLabel: 'Cache Folder Directory in Remote Docker',
        userDataDirPlaceholder: '/mnt/share/tmp'
      },
      localChrome: {
        title: 'Local Chrome',
        caption: 'If the program can automatically download Chrome, specifying a version is not recommended. Updates will fetch the latest Chrome, but specified versions cannot be updated by the program. Prioritize fixing network issues for automatic downloads. Chrome download is handled by go-rod; report issues there. Notes: <div><ol><li>Docker Users: Map your extracted /volume1/docker/chinesesubfinder/Chrome folder to /app/cache/Plugin/Chrome in the container. The full path inside the container should be (example, adapt to your downloaded Chrome): /app/cache/Plugin/Chrome/chrome</li><li>Windows Users: Full path to your Chrome.exe</li><li>Do not use a very old Chrome version</li><li>Ensure the specified Chrome matches the platform and CPU architecture</li></ol></div>',
        pathLabel: 'Full Path to Chrome(.exe)',
        pathPlaceholder: '/your/chrome/path/chrome.exe'
      },
      apiKey: {
        title: 'API Key',
        caption: 'This program provides some interfaces for developers, authenticated via API key. See <a href="https://github.com/ChineseSubFinder/ChineseSubFinder/blob/docs/DesignFile/ApiKey%E8%AE%BE%E8%AE%A1/ApiKey%E8%AE%BE%E8%AE%A1.md" class="text-primary" target="_blank">Developer Documentation</a> for details.',
        regenerateButton: 'Regenerate Key'
      }
    }
  },

  units: {
    seconds: 'Seconds',
    hours: 'Hours',
    days: 'Days'
  },

  library: {
    tvs: {
      hasSubtitles: 'Has Subtitles',
      noSubtitles: 'No Subtitles'
    },
    detailDialog: {
      title: '{showName} Episode List',
      seasonLabel: 'Season {season}',
      selectAllTooltip: 'Select/Deselect All',
      downloadSelectedButton: 'Download Selected',
      lockSelectedTooltip: 'Lock selected videos, skip subtitle download',
      unlockSelectedTooltip: 'Unlock selected videos',
      searchSeasonPackageButton: 'Search Season Subtitle Package',
      episodeLabel: 'Episode {episode}',
      bulkDownloadDialog: {
        title: 'Add {count} video tasks to download queue',
        successMessage: 'Successfully added {successCount} tasks to download queue{errorMessage}',
        errorMessagePart: ', {errorCount} failed'
      },
      bulkLockDialog: {
        title: '{action} selected videos',
        message: 'Are you sure you want to {action} the selected videos?'
      }
    },
    refreshCache: {
      buttonLabel: 'Refresh Cache',
      buttonLoading: 'Refreshing Cache...',
      dialogTitle: 'Refresh Cache',
      dialogMessage: 'Refreshing the cache does not automatically submit subtitle download tasks; it only facilitates manually selecting a video to download subtitles. This is a time-consuming task; please perform it only when manual operation is needed. Dynamic cache updates are not currently supported; a full manual cache refresh is required.'
    },
    refreshMediaServerSubs: {
      buttonLabel: 'Update Media Server Subtitles',
      dialogTitle: 'Update Media Server Subtitles',
      dialogMessage: 'This operation will refresh the subtitles for the latest 10,000 videos and may take some time to take effect. Submitting will trigger a media server refresh (asynchronous operation, no need for frequent clicks). The time for the server refresh to take effect depends on the number of media files.',
      successMessage: 'Refresh successful'
    },
    uploadSubtitle: {
      statusUploading: 'Uploading Subtitle...',
      buttonLabel: 'Upload Local Subtitle',
      buttonTitle: 'Upload Local Subtitle',
      successMessage: 'Subtitle uploaded successfully. If \"Auto Correct Timeline\" is enabled, processing may take some time, please wait patiently.'
    },
    ignoreVideo: {
      buttonTitleLocked: 'Video is currently locked, subtitle download skipped',
      buttonTitleUnlocked: 'Click to lock video and skip subtitle download',
      lockDialogMessage: 'Are you sure you want to lock this video and skip subtitle download?',
      unlockDialogMessage: 'Are you sure you want to unlock this video?'
    },
    searchSubtitle: {
      buttonTitle: 'Search Subtitles',
      dialogTitle: 'Search Subtitles',
      dialogWarning: 'Subtitle package downloading is processed in the browser, please do not close the page during download.',
      tabSubtitleBest: 'Subtitle.Best API',
      tabManual: 'Manual Search',
      manual: {
        tooltip: 'Click keyword to search on website',
        instruction: 'Click keyword to search on website'
      }
    }
  },

  common: {
    confirmationTitle: 'Confirm',
    operationSuccess: 'Operation successful!',
    all: 'All',
    videoTypeMap: {
      '0': 'Movie',
      '1': 'TV Series'
    }
    // Add more common translations
  },

  jobs: {
    upgradePriorityButton: 'Upgrade Priority',
    downgradePriorityButton: 'Downgrade Priority',
    changeStatusButton: 'Change Status',
    filters: {
      status: 'Status',
      type: 'Type',
      priority: 'Priority',
      search: 'Enter keyword to search'
    },
    columns: {
      status: 'Status',
      type: 'Type',
      name: 'Name',
      priority: 'Priority',
      addedTime: 'Added Time',
      updateTime: 'Updated Time',
      errorInfo: 'Error Info',
      downloadTimes: 'Downloads',
      retryTimes: 'Retries',
      actions: 'Actions'
    },
    statusMap: {
      '0': 'Pending',
      '1': 'Processing',
      '2': 'Done',
      '3': 'Error',
      '4': 'Ignore'
      // Match JOB_STATUS_MAP keys
    },
    priorityOptions: {
      low: 'Low (7-10)',
      middle: 'Middle (4-6)',
      high: 'High (0-3)'
    },
    confirmPriorityChange: 'Confirm priority change?',
    priorityUpdateError: '{count} tasks failed to update priority!',
    priorityUpdateSuccess: 'Successfully updated priority',
    changeStatusDialog: {
      title: 'Change Status',
      message: 'Which status should it be changed to?'
    },
    statusUpdateError: '{count} tasks failed to update status!',
    statusUpdateSuccess: 'Successfully updated task status',
    logDialog: {
      buttonLabel: 'Task Log',
      title: 'Task Log'
    },
    detailDialog: {
      buttonLabel: 'Details',
      title: 'Task Details',
      id: 'ID',
      status: 'Status',
      type: 'Type',
      path: 'Path',
      name: 'Name',
      feature: 'Feature',
      seriesRootDir: 'Series Root Dir',
      season: 'Season',
      episode: 'Episode',
      mediaServerId: 'Media Server ID',
      priority: 'Priority',
      videoCreationTime: 'Video Creation Time',
      taskCreationTime: 'Task Creation Time',
      updateTime: 'Update Time',
      errorInfo: 'Error Info',
      downloadTimes: 'Downloads',
      retryTimes: 'Retries'
    }
  },

  // Add more English translations here
}