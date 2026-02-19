/**
 * Delivery Estimator - Pan-India pincode-based delivery estimate (no real-time API).
 * Update WAREHOUSE_PINCODE to your fulfillment location.
 */
(function() {
  'use strict';

  // Your warehouse/fulfillment location pincode – update with your actual location
  var WAREHOUSE_PINCODE = '422010';

  var PINCODE_REGIONS = {
    north: ['110', '111', '112', '113', '114', '121', '122', '124', '125', '127', '128', '131', '132', '133', '134', '135', '140', '141', '142', '143', '144', '145', '146', '147', '148', '151', '152', '153', '160', '161', '162', '163', '164', '165', '166', '171', '172', '173', '174', '175', '176', '177', '180', '181', '182', '183', '184', '185', '190', '191', '192', '193', '194', '201', '202', '203', '204', '205', '206', '207', '208', '209', '210', '211', '212', '221', '222', '223', '224', '225', '226', '227', '228', '229', '230', '231', '232', '233', '234', '241', '242', '243', '244', '245', '246', '247', '248', '249', '250', '251', '281', '282', '283', '284', '285', '301', '302', '303', '304', '305', '306', '307', '321', '322', '323', '324', '325', '326', '327', '328', '331', '332', '333', '334', '335', '336', '337', '341', '342', '343', '344', '345'],
    south: ['500', '501', '502', '503', '504', '505', '506', '507', '508', '509', '510', '515', '516', '517', '518', '520', '521', '522', '523', '524', '525', '526', '527', '530', '531', '532', '533', '534', '535', '560', '561', '562', '563', '570', '571', '572', '573', '574', '575', '576', '577', '580', '581', '582', '583', '585', '586', '587', '590', '591', '600', '601', '602', '603', '604', '605', '606', '607', '608', '609', '610', '611', '612', '613', '614', '620', '621', '622', '623', '624', '625', '626', '627', '628', '629', '630', '631', '632', '635', '636', '637', '638', '639', '640', '641', '642', '643', '670', '671', '672', '673', '674', '675', '676', '678', '679', '680', '681', '682', '683', '685', '686', '688', '689', '690', '691'],
    west: ['380', '381', '382', '383', '384', '385', '387', '388', '389', '390', '391', '392', '393', '394', '395', '396', '400', '401', '402', '403', '404', '410', '411', '412', '413', '414', '415', '416', '417', '421', '422', '423', '424', '425', '431', '440', '441', '442', '443', '444', '445', '450', '451', '452', '453', '454', '455', '456', '457', '458', '459', '460', '461', '462', '463', '464', '465', '466'],
    east: ['700', '701', '711', '712', '713', '721', '731', '732', '733', '734', '735', '736', '737', '741', '742', '743', '744', '751', '752', '753', '754', '755', '756', '757', '758', '759', '760', '761', '762', '763', '764', '765', '766', '767', '768', '769', '770', '781', '782', '783', '784', '785', '786', '787', '788', '790', '791', '792', '793', '794', '795', '796', '797', '798', '799', '800', '801', '802', '803', '804', '805', '811', '812', '813', '814', '815', '816', '821', '822', '823', '824', '825', '826', '827', '828', '831', '832', '833', '834', '835'],
    central: ['450', '451', '452', '453', '454', '455', '456', '457', '458', '459', '460', '461', '462', '463', '464', '465', '466', '470', '471', '472', '473', '474', '475', '476', '480', '481', '482', '483', '484', '485', '486', '487', '488', '490', '491', '492', '493', '494', '495', '496', '497']
  };

  function getRegion(pincode) {
    var prefix = pincode.substring(0, 3);
    var regionNames = Object.keys(PINCODE_REGIONS);
    for (var i = 0; i < regionNames.length; i++) {
      if (PINCODE_REGIONS[regionNames[i]].indexOf(prefix) !== -1) {
        return regionNames[i];
      }
    }
    return 'other';
  }

  function estimateDelivery(pincode) {
    if (!/^[0-9]{6}$/.test(pincode)) {
      return { success: false, message: 'Please enter a valid 6-digit pincode' };
    }
    var warehouseRegion = getRegion(WAREHOUSE_PINCODE);
    var customerRegion = getRegion(pincode);
    var minDays, maxDays;
    if (customerRegion === warehouseRegion) {
      minDays = 2;
      maxDays = 4;
    } else if (
      (warehouseRegion === 'south' && customerRegion === 'central') ||
      (warehouseRegion === 'central' && ['south', 'west', 'north'].indexOf(customerRegion) !== -1) ||
      (warehouseRegion === 'west' && ['central', 'north'].indexOf(customerRegion) !== -1)
    ) {
      minDays = 4;
      maxDays = 6;
    } else {
      minDays = 6;
      maxDays = 8;
    }
    var deliveryDays = minDays + '-' + maxDays + ' business days';
    return {
      success: true,
      message: 'Estimated delivery: ' + deliveryDays,
      days: deliveryDays,
      minDays: minDays,
      maxDays: maxDays
    };
  }

  function addBusinessDays(date, days) {
    var result = new Date(date);
    var added = 0;
    while (added < days) {
      result.setDate(result.getDate() + 1);
      var dayOfWeek = result.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        added++;
      }
    }
    return result;
  }

  function formatDate(date) {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
  }

  function calculateDeliveryDate(pincode) {
    var estimate = estimateDelivery(pincode);
    if (!estimate.success) return null;
    var today = new Date();
    var minDate = addBusinessDays(today, estimate.minDays);
    var maxDate = addBusinessDays(today, estimate.maxDays);
    return {
      minDate: formatDate(minDate),
      maxDate: formatDate(maxDate),
      minDateObj: minDate,
      maxDateObj: maxDate,
      days: estimate.days
    };
  }

  window.calculateDeliveryDate = calculateDeliveryDate;
  window.estimateDelivery = estimateDelivery;

  function init() {
    var input = document.getElementById('delivery-estimator-pincode');
    var button = document.getElementById('delivery-estimator-check');
    var result = document.getElementById('delivery-estimator-result');
    
    if (!input || !button || !result) {
      setTimeout(init, 100);
      return;
    }

    function runCheck() {
      var pincode = input.value.trim();
      if (!pincode) {
        result.className = 'delivery-estimator__result delivery-error';
        result.textContent = 'Please enter a pincode';
        return;
      }
      var estimate = estimateDelivery(pincode);
      result.className = 'delivery-estimator__result ' + (estimate.success ? 'delivery-success' : 'delivery-error');
      result.textContent = estimate.message;
    }

    button.addEventListener('click', runCheck);
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        runCheck();
      }
    });
    
    input.addEventListener('input', function(e) {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
  }

  function startInit() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

  startInit();
  
  if (typeof window.addEventListener !== 'undefined') {
    window.addEventListener('load', function() {
      setTimeout(init, 50);
    });
  }
})();
