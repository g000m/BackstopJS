module.exports = options => {
  return {
    id: `${options.project}_test`,
    viewports: [
      {
        name: 'mobile',
        width: 425,
        height: 678
      },
      {
        name: 'tablet',
        width: 768,
        height: 678
      },
      {
        name: 'laptop',
        width: 1280,
        height: 800
      }
    ],
    scenarios: options.scenarios,
    paths: {
      bitmaps_reference: `backstop_data/${options.project}/bitmaps_reference`,
      bitmaps_test: `backstop_data/${options.project}/bitmaps_test`,
      html_report: `backstop_data/${options.project}/html_report`,
      ci_report: `backstop_data/${options.project}/ci_report`
    },
    report: ['browser', 'CI'],
    engine: 'puppeteer',
    debug: false
  };
};
