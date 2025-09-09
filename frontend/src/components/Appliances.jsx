const SIZE = 48;
function Appliances() {
  return (
    <section className="flex flex-col items-center py-10 px-4 bg-gray-50">
      <h2 className="text-4xl font-bold text-center">
        We fix <span className="text-orange-600">all</span> appliances and brands
      </h2>
      <p className="text-lg mt-2 mb-6 text-gray-600">
        Ovens, cooktops, microwaves, refrigerators, dishwashers, washers and dryers; We handle it all.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Oven */}
        <div className="bg-white shadow-md rounded-lg p-6 max-w-sm hover:shadow-lg transition-shadow duration-300">
          <img src="https://media.istockphoto.com/id/174952194/photo/appetizing-pork-joint-dinner-in-the-oven-for-thanksgiving-day.jpg?s=612x612&w=0&k=20&c=wGDcV1pKTdBIxLIo0fugg63-TgRWG0nurjgwVTl8aeY=" alt="Oven" className="w-full h-40 object-cover rounded-md mb-4" />
          <h3 className="text-xl font-semibold mb-2">Kitchen Appliances</h3>
          <div className="flex justify-center my-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Oven-Gen--Streamline-Outlined-Material" 
            height={SIZE} width={SIZE}>
              <desc>
                Oven Gen Streamline Icon: https://streamlinehq.com
              </desc>
              <path fill="#000000" d="M4.5 21c-0.4 0 -0.75 -0.15 -1.05 -0.45 -0.3 -0.3 -0.45 -0.65 -0.45 -1.05V4.5c0 -0.4 0.15 -0.75 0.45 -1.05C3.75 3.15 4.1 3 4.5 3h15c0.4 0 0.75 0.15 1.05 0.45 0.3 0.3 0.45 0.65 0.45 1.05v15c0 0.4 -0.15 0.75 -0.45 1.05 -0.3 0.3 -0.65 0.45 -1.05 0.45H4.5Zm0 -9.25V19.5h15V11.75h-2.75v5h-9.5v-5H4.5Zm4.25 3.5h6.5v-3.5h-6.5v3.5ZM4.5 10.25h15V4.5H4.5v5.75Zm3.4955 -2.5c-0.21365 0 -0.39135 -0.07235 -0.533 -0.217 -0.14165 -0.1445 -0.2125 -0.32365 -0.2125 -0.5375 0 -0.21365 0.07235 -0.39135 0.217 -0.533 0.1445 -0.14165 0.32365 -0.2125 0.5375 -0.2125 0.21365 0 0.39135 0.07235 0.533 0.217 0.14165 0.1445 0.2125 0.32365 0.2125 0.5375 0 0.21365 -0.07235 0.39135 -0.217 0.533 -0.1445 0.14165 -0.32365 0.2125 -0.5375 0.2125Zm4 0c-0.21365 0 -0.39135 -0.07235 -0.533 -0.217 -0.14165 -0.1445 -0.2125 -0.32365 -0.2125 -0.5375 0 -0.21365 0.07235 -0.39135 0.217 -0.533 0.1445 -0.14165 0.32365 -0.2125 0.5375 -0.2125 0.21365 0 0.39135 0.07235 0.533 0.217 0.14165 0.1445 0.2125 0.32365 0.2125 0.5375 0 0.21365 -0.07235 0.39135 -0.217 0.533 -0.1445 0.14165 -0.32365 0.2125 -0.5375 0.2125Zm4 0c-0.21365 0 -0.39135 -0.07235 -0.533 -0.217 -0.14165 -0.1445 -0.2125 -0.32365 -0.2125 -0.5375 0 -0.21365 0.07235 -0.39135 0.217 -0.533 0.1445 -0.14165 0.32365 -0.2125 0.5375 -0.2125 0.21365 0 0.39135 0.07235 0.533 0.217 0.14165 0.1445 0.2125 0.32365 0.2125 0.5375 0 0.21365 -0.07235 0.39135 -0.217 0.533 -0.1445 0.14165 -0.32365 0.2125 -0.5375 0.2125Z" stroke-width="0.5"></path>
            </svg>
          </div>
          <p className="text-gray-600">
            We service and repair ovens, cooktops, and microwaves.
          </p>
        </div>

        {/* Fridge */}
        <div className="bg-white shadow-md rounded-lg p-6 max-w-sm hover:shadow-lg transition-shadow duration-300">
          <img src="https://www.kitchenaid.com/is/image/content/dam/business-unit/kitchenaid/en-us/marketing-content/site-assets/page-content/pinch-of-help/types-of-refrigerators/Types_of_Refrigerators_IMG_14_M.jpg?fmt=png-alpha&qlt=85,0&resMode=sharp2&op_usm=1.75,0.3,2,0&scl=1&constrain=fit,1" alt="Refrigerator" className="w-full h-40 object-cover rounded-md mb-4" />
          <h3 className="text-xl font-semibold mb-2">Refrigerator Repair</h3>
          <div className="flex justify-center my-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Kitchen--Streamline-Rounded-Material" 
            height={SIZE} width={SIZE}>
              <desc>
                Kitchen Streamline Icon: https://streamlinehq.com
              </desc>
              <path fill="#000000" d="M8.4705 7.75c-0.21365 0 -0.39135 -0.0719 -0.533 -0.21575 -0.14165 -0.14365 -0.2125 -0.32175 -0.2125 -0.53425v-1.45c0 -0.2125 0.07235 -0.39065 0.217 -0.5345 0.1445 -0.143665 0.32365 -0.2155 0.5375 -0.2155 0.21365 0 0.39135 0.071835 0.533 0.2155 0.14165 0.14385 0.2125 0.322 0.2125 0.5345V7c0 0.2125 -0.07235 0.3906 -0.217 0.53425 -0.1445 0.14385 -0.32365 0.21575 -0.5375 0.21575Zm0 9.025c-0.21365 0 -0.39135 -0.0719 -0.533 -0.21575 -0.14165 -0.14365 -0.2125 -0.32175 -0.2125 -0.53425v-3.4c0 -0.2125 0.07235 -0.39065 0.217 -0.5345 0.1445 -0.14365 0.32365 -0.2155 0.5375 -0.2155 0.21365 0 0.39135 0.07185 0.533 0.2155 0.14165 0.14385 0.2125 0.322 0.2125 0.5345v3.4c0 0.2125 -0.07235 0.3906 -0.217 0.53425 -0.1445 0.14385 -0.32365 0.21575 -0.5375 0.21575ZM5.5 22c-0.4125 0 -0.765585 -0.1469 -1.05925 -0.44075C4.146915 21.2656 4 20.9125 4 20.5V3.5c0 -0.4125 0.146915 -0.765665 0.44075 -1.0595C4.734415 2.146835 5.0875 2 5.5 2h13c0.4125 0 0.76565 0.146835 1.0595 0.4405C19.85315 2.734335 20 3.0875 20 3.5v17c0 0.4125 -0.14685 0.7656 -0.4405 1.05925C19.26565 21.8531 18.9125 22 18.5 22H5.5Zm0 -1.5h13V10.55H5.5V20.5Zm0 -11.45h13V3.5H5.5v5.55Z" stroke-width="0.5"></path>
            </svg>
          </div>
          <p className="text-gray-600">
            Refrigerator not running? We can get it cooling again in no time.
          </p>
        </div>

        {/* Dishwasher */}
        <div className="bg-white shadow-md rounded-lg p-6 max-w-sm hover:shadow-lg transition-shadow duration-300">
          <img src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/pageImages/page__en_us_1725352754557__0.jpeg" alt="Dishwasher" className="w-full h-40 object-cover rounded-md mb-4" />
          <h3 className="text-xl font-semibold mb-2">Dishwasher Repair</h3>
          <div className="flex justify-center my-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Dishwasher-Fill--Streamline-Rounded-Fill-Material" 
            height={SIZE} width={SIZE}>
              <desc>
                Dishwasher Fill Streamline Icon: https://streamlinehq.com
              </desc>
              <path fill="#000000" d="M4.5 10v9.5h15V10H4.5Zm7.49775 7.325c-0.48185 0 -0.8936 -0.17135 -1.23525 -0.514 -0.34165 -0.34285 -0.5125 -0.75485 -0.5125 -1.236 0 -0.23335 0.0375 -0.47085 0.1125 -0.7125 0.075 -0.24165 0.1875 -0.50415 0.3375 -0.7875 0.15 -0.28335 0.30875 -0.54975 0.47625 -0.79925 0.16735 -0.2495 0.34175 -0.499 0.52325 -0.7485 0.08365 -0.11815 0.18385 -0.17725 0.3005 -0.17725 0.11665 0 0.21685 0.0591 0.3005 0.17725 0.1815 0.2495 0.3559 0.499 0.52325 0.7485 0.1675 0.2495 0.32625 0.5159 0.47625 0.79925 0.15 0.28335 0.2625 0.54585 0.3375 0.7875 0.075 0.24165 0.1125 0.47915 0.1125 0.7125 0 0.48115 -0.1716 0.89315 -0.51475 1.236 -0.34315 0.34265 -0.75565 0.514 -1.2375 0.514ZM17.5 7.25c0.2 0 0.375 -0.075 0.525 -0.225 0.15 -0.15 0.225 -0.325 0.225 -0.525s-0.075 -0.375 -0.225 -0.525c-0.15 -0.15 -0.325 -0.225 -0.525 -0.225s-0.375 0.075 -0.525 0.225c-0.15 0.15 -0.225 0.325 -0.225 0.525s0.075 0.375 0.225 0.525c0.15 0.15 0.325 0.225 0.525 0.225ZM4.5 21c-0.4 0 -0.75 -0.15 -1.05 -0.45 -0.3 -0.3 -0.45 -0.65 -0.45 -1.05V4.5c0 -0.4 0.15 -0.75 0.45 -1.05C3.75 3.15 4.1 3 4.5 3h15c0.4 0 0.75 0.15 1.05 0.45 0.3 0.3 0.45 0.65 0.45 1.05v15c0 0.4 -0.15 0.75 -0.45 1.05 -0.3 0.3 -0.65 0.45 -1.05 0.45H4.5Z" stroke-width="0.5"></path>
            </svg>
          </div>
          <p className="text-gray-600">
            Save time spent handwashing dishes, service your dishwasher today.
          </p>
        </div>

        {/* Washing Machine */}
        <div className="bg-white shadow-md rounded-lg p-6 max-w-sm hover:shadow-lg transition-shadow duration-300">
          <img src="https://linqcdn.avbportal.com/images/f473d7cd-1927-4f80-b625-2906aa94ebcf.jpg?w=640" alt="Washer/Dryer" className="w-full h-40 object-cover rounded-md mb-4" />
          <h3 className="text-xl font-semibold mb-2">Washer/Dryer Repair</h3>
          <div className="flex justify-center my-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Local-Laundry-Service--Streamline-Rounded-Material" 
            height={SIZE} width={SIZE}>
              <desc>
                Local Laundry Service Streamline Icon: https://streamlinehq.com
              </desc>
              <path fill="#000000" d="M5.5 22c-0.4125 0 -0.765585 -0.1469 -1.05925 -0.44075C4.146915 21.2656 4 20.9125 4 20.5V3.5c0 -0.4125 0.146915 -0.765665 0.44075 -1.0595C4.734415 2.146835 5.0875 2 5.5 2h13c0.4125 0 0.76565 0.146835 1.0595 0.4405C19.85315 2.734335 20 3.0875 20 3.5v17c0 0.4125 -0.14685 0.7656 -0.4405 1.05925C19.26565 21.8531 18.9125 22 18.5 22H5.5Zm0 -1.5h13V3.5H5.5v17Zm6.5 -1.475c1.34185 0 2.48565 -0.47285 3.4315 -1.4185 0.94565 -0.94585 1.4185 -2.08965 1.4185 -3.4315 0 -1.34185 -0.47285 -2.48565 -1.4185 -3.4315 -0.94585 -0.94565 -2.08965 -1.4185 -3.4315 -1.4185 -1.34185 0 -2.48565 0.47285 -3.4315 1.4185 -0.94565 0.94585 -1.4185 2.08965 -1.4185 3.4315 0 1.34185 0.47285 2.48565 1.4185 3.4315 0.94585 0.94565 2.08965 1.4185 3.4315 1.4185Zm0 -2.1c-0.378 0 -0.7451 -0.06665 -1.10125 -0.2 -0.35635 -0.13335 -0.6726 -0.33335 -0.94875 -0.6l3.975 -3.975c0.28335 0.25 0.49165 0.55465 0.625 0.914 0.13335 0.35935 0.2 0.72965 0.2 1.111 0 0.76385 -0.26735 1.41315 -0.802 1.948 -0.53485 0.53465 -1.18415 0.802 -1.948 0.802ZM7.6045 6.3c0.21365 0 0.39135 -0.07235 0.533 -0.217 0.14165 -0.1445 0.2125 -0.32365 0.2125 -0.5375 0 -0.21365 -0.07235 -0.39135 -0.217 -0.533 -0.1445 -0.141665 -0.32365 -0.2125 -0.5375 -0.2125 -0.21365 0 -0.39135 0.072335 -0.533 0.217 -0.14165 0.1445 -0.2125 0.32365 -0.2125 0.5375 0 0.21365 0.07235 0.39135 0.217 0.533 0.1445 0.14165 0.32365 0.2125 0.5375 0.2125Zm3.35 0c0.21365 0 0.39135 -0.07235 0.533 -0.217 0.14165 -0.1445 0.2125 -0.32365 0.2125 -0.5375 0 -0.21365 -0.07235 -0.39135 -0.217 -0.533 -0.1445 -0.141665 -0.32365 -0.2125 -0.5375 -0.2125 -0.21365 0 -0.39135 0.072335 -0.533 0.217 -0.14165 0.1445 -0.2125 0.32365 -0.2125 0.5375 0 0.21365 0.07235 0.39135 0.217 0.533 0.1445 0.14165 0.32365 0.2125 0.5375 0.2125Z" stroke-width="0.5"></path>
            </svg>
          </div>
          <p className="text-gray-600">
            Comprehensive repair and maintenance services for washers and dryers.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Appliances;