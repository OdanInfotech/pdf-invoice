const path = require("path");
const { PDFInvoice } = require("../dist/index");

/* --------------------------------------------------------------------------
	Payload.
  -------------------------------------------------------------------------- */
const payload = {
	company: {
		logo: '<svg width="98" height="34" viewBox="0 0 98 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M39.332 27V14.4H47V15.642H40.844V20.07H46.082V21.294H40.844V27H39.332ZM52.4845 27.216C51.6325 27.216 50.8765 27.024 50.2165 26.64C49.5565 26.244 49.0345 25.698 48.6505 25.002C48.2785 24.306 48.0925 23.484 48.0925 22.536C48.0925 21.6 48.2785 20.784 48.6505 20.088C49.0225 19.38 49.5385 18.834 50.1985 18.45C50.8705 18.054 51.6445 17.856 52.5205 17.856C53.3845 17.856 54.1285 18.054 54.7525 18.45C55.3885 18.834 55.8745 19.344 56.2105 19.98C56.5465 20.616 56.7145 21.3 56.7145 22.032C56.7145 22.164 56.7085 22.296 56.6965 22.428C56.6965 22.56 56.6965 22.71 56.6965 22.878H49.5865C49.6225 23.562 49.7785 24.132 50.0545 24.588C50.3425 25.032 50.6965 25.368 51.1165 25.596C51.5485 25.824 52.0045 25.938 52.4845 25.938C53.1085 25.938 53.6305 25.794 54.0505 25.506C54.4705 25.218 54.7765 24.828 54.9685 24.336H56.4625C56.2225 25.164 55.7605 25.854 55.0765 26.406C54.4045 26.946 53.5405 27.216 52.4845 27.216ZM52.4845 19.134C51.7645 19.134 51.1225 19.356 50.5585 19.8C50.0065 20.232 49.6885 20.868 49.6045 21.708H55.2205C55.1845 20.904 54.9085 20.274 54.3925 19.818C53.8765 19.362 53.2405 19.134 52.4845 19.134ZM62.1386 27.216C61.0706 27.216 60.1826 26.946 59.4746 26.406C58.7666 25.866 58.3526 25.134 58.2326 24.21H59.7806C59.8766 24.678 60.1226 25.086 60.5186 25.434C60.9266 25.77 61.4726 25.938 62.1566 25.938C62.7926 25.938 63.2606 25.806 63.5606 25.542C63.8606 25.266 64.0106 24.942 64.0106 24.57C64.0106 24.03 63.8126 23.67 63.4166 23.49C63.0326 23.31 62.4866 23.148 61.7786 23.004C61.2986 22.908 60.8186 22.77 60.3386 22.59C59.8586 22.41 59.4566 22.158 59.1326 21.834C58.8086 21.498 58.6466 21.06 58.6466 20.52C58.6466 19.74 58.9346 19.104 59.5106 18.612C60.0986 18.108 60.8906 17.856 61.8866 17.856C62.8346 17.856 63.6086 18.096 64.2086 18.576C64.8206 19.044 65.1746 19.716 65.2706 20.592H63.7766C63.7166 20.136 63.5186 19.782 63.1826 19.53C62.8586 19.266 62.4206 19.134 61.8686 19.134C61.3286 19.134 60.9086 19.248 60.6086 19.476C60.3206 19.704 60.1766 20.004 60.1766 20.376C60.1766 20.736 60.3626 21.018 60.7346 21.222C61.1186 21.426 61.6346 21.6 62.2826 21.744C62.8346 21.864 63.3566 22.014 63.8486 22.194C64.3526 22.362 64.7606 22.62 65.0726 22.968C65.3966 23.304 65.5586 23.796 65.5586 24.444C65.5706 25.248 65.2646 25.914 64.6406 26.442C64.0286 26.958 63.1946 27.216 62.1386 27.216ZM70.8423 27C70.0263 27 69.3843 26.802 68.9163 26.406C68.4483 26.01 68.2143 25.296 68.2143 24.264V19.35H66.6663V18.072H68.2143L68.4123 15.93H69.7263V18.072H72.3543V19.35H69.7263V24.264C69.7263 24.828 69.8403 25.212 70.0683 25.416C70.2963 25.608 70.6983 25.704 71.2743 25.704H72.2103V27H70.8423ZM74.2752 27V18.072H75.6432L75.7692 19.782C76.0452 19.194 76.4652 18.726 77.0292 18.378C77.5932 18.03 78.2892 17.856 79.1172 17.856V19.44H78.7032C78.1752 19.44 77.6892 19.536 77.2452 19.728C76.8012 19.908 76.4472 20.22 76.1832 20.664C75.9192 21.108 75.7872 21.72 75.7872 22.5V27H74.2752ZM84.5483 27.216C83.7083 27.216 82.9523 27.024 82.2803 26.64C81.6083 26.256 81.0743 25.716 80.6783 25.02C80.2943 24.312 80.1023 23.484 80.1023 22.536C80.1023 21.588 80.3003 20.766 80.6963 20.07C81.0923 19.362 81.6263 18.816 82.2983 18.432C82.9823 18.048 83.7443 17.856 84.5843 17.856C85.4243 17.856 86.1803 18.048 86.8523 18.432C87.5243 18.816 88.0523 19.362 88.4363 20.07C88.8323 20.766 89.0303 21.588 89.0303 22.536C89.0303 23.484 88.8323 24.312 88.4363 25.02C88.0403 25.716 87.5003 26.256 86.8163 26.64C86.1443 27.024 85.3883 27.216 84.5483 27.216ZM84.5483 25.92C85.0643 25.92 85.5443 25.794 85.9883 25.542C86.4323 25.29 86.7923 24.912 87.0683 24.408C87.3443 23.904 87.4823 23.28 87.4823 22.536C87.4823 21.792 87.3443 21.168 87.0683 20.664C86.8043 20.16 86.4503 19.782 86.0063 19.53C85.5623 19.278 85.0883 19.152 84.5843 19.152C84.0683 19.152 83.5883 19.278 83.1443 19.53C82.7003 19.782 82.3403 20.16 82.0643 20.664C81.7883 21.168 81.6503 21.792 81.6503 22.536C81.6503 23.28 81.7883 23.904 82.0643 24.408C82.3403 24.912 82.6943 25.29 83.1263 25.542C83.5703 25.794 84.0443 25.92 84.5483 25.92ZM91.1326 27V14.04H92.6446V27H91.1326ZM95.6449 27.09C95.3449 27.09 95.0929 26.994 94.8889 26.802C94.6969 26.598 94.6009 26.352 94.6009 26.064C94.6009 25.776 94.6969 25.536 94.8889 25.344C95.0929 25.14 95.3449 25.038 95.6449 25.038C95.9329 25.038 96.1729 25.14 96.3649 25.344C96.5689 25.536 96.6709 25.776 96.6709 26.064C96.6709 26.352 96.5689 26.598 96.3649 26.802C96.1729 26.994 95.9329 27.09 95.6449 27.09Z" fill="#0D41FC"/><path d="M0 5C0 2.23858 2.23858 0 5 0H14C25.0457 0 34 8.95431 34 20V29C34 31.7614 31.7614 34 29 34H5C2.23858 34 0 31.7614 0 29V5Z" fill="url(#paint0_linear_103_12)"/><path d="M17.2383 17.7793C17.2513 17.7793 17.2578 17.7988 17.2578 17.8379C17.2578 17.903 17.222 18.0234 17.1504 18.1992C17.0788 18.3685 16.9746 18.5671 16.8379 18.7949C16.7012 19.0228 16.5319 19.2637 16.3301 19.5176C16.1348 19.7715 15.9102 20.0124 15.6562 20.2402C15.526 20.2728 15.36 20.3086 15.1582 20.3477C14.9564 20.3802 14.7253 20.4128 14.4648 20.4453C14.2109 20.4779 13.9342 20.5137 13.6348 20.5527C13.3353 20.5853 13.0228 20.6178 12.6973 20.6504C12.3132 21.2559 11.9388 21.8581 11.5742 22.457C11.2161 23.056 10.8776 23.6354 10.5586 24.1953C10.2396 24.7617 9.94336 25.3053 9.66992 25.8262C9.40299 26.347 9.17188 26.832 8.97656 27.2812C8.83333 27.3398 8.62174 27.3984 8.3418 27.457C8.06185 27.5221 7.76888 27.584 7.46289 27.6426C7.16341 27.7012 6.88346 27.7565 6.62305 27.8086C6.36263 27.8607 6.18034 27.903 6.07617 27.9355C6.68815 26.627 7.30339 25.3932 7.92188 24.2344C8.54688 23.082 9.1849 21.972 9.83594 20.9043C9.4974 20.9303 9.17839 20.9564 8.87891 20.9824C8.57943 21.002 8.31576 21.0182 8.08789 21.0312C7.86003 21.0443 7.67448 21.0573 7.53125 21.0703C7.38802 21.0768 7.30339 21.0801 7.27734 21.0801C7.23828 21.0801 7.21875 21.054 7.21875 21.002C7.21875 20.9303 7.2513 20.8262 7.31641 20.6895C7.38151 20.5527 7.45638 20.416 7.54102 20.2793C7.63216 20.1361 7.72331 20.0124 7.81445 19.9082C7.91211 19.7975 7.98698 19.7357 8.03906 19.7227C8.54688 19.6771 9.02539 19.6283 9.47461 19.5762C9.93034 19.5241 10.3633 19.4688 10.7734 19.4102C11.8346 17.763 12.9219 16.2168 14.0352 14.7715C15.1484 13.3262 16.278 11.9167 17.4238 10.543C17.4499 10.5169 17.4629 10.4616 17.4629 10.377C17.4629 10.3379 17.4499 10.2988 17.4238 10.2598C17.4043 10.2207 17.3555 10.2142 17.2773 10.2402C15.8906 10.6178 14.6374 11.0378 13.5176 11.5C12.3978 11.9622 11.4017 12.431 10.5293 12.9062C9.6569 13.375 8.90169 13.834 8.26367 14.2832C7.63216 14.7324 7.11133 15.1393 6.70117 15.5039C6.29102 15.862 5.98828 16.1582 5.79297 16.3926C5.59766 16.627 5.5 16.7637 5.5 16.8027C5.5 16.8223 5.50651 16.8516 5.51953 16.8906C5.53906 16.9232 5.59766 16.9395 5.69531 16.9395C5.90365 16.9395 6.125 16.9102 6.35938 16.8516C6.60026 16.793 6.83789 16.7181 7.07227 16.627C7.31315 16.5358 7.54427 16.4382 7.76562 16.334C7.98698 16.2233 8.19206 16.1191 8.38086 16.0215C8.38737 16.1712 8.39388 16.347 8.40039 16.5488C8.41341 16.7441 8.42318 16.9427 8.42969 17.1445C8.44271 17.3464 8.45247 17.5417 8.45898 17.7305C8.47201 17.9128 8.47852 18.0625 8.47852 18.1797C8.40039 18.2188 8.27344 18.2611 8.09766 18.3066C7.92188 18.3457 7.70703 18.3848 7.45312 18.4238C7.20573 18.4564 6.92253 18.4857 6.60352 18.5117C6.29102 18.5312 5.95573 18.541 5.59766 18.541C5.55859 18.541 5.52604 18.5378 5.5 18.5312C5.48047 18.5247 5.46094 18.5215 5.44141 18.5215C5.38281 18.515 5.29492 18.4629 5.17773 18.3652C5.06706 18.2676 4.94336 18.1439 4.80664 17.9941C4.66992 17.8444 4.52995 17.6816 4.38672 17.5059C4.24349 17.3236 4.11328 17.151 3.99609 16.9883C3.87891 16.819 3.78125 16.666 3.70312 16.5293C3.63151 16.3861 3.5957 16.2819 3.5957 16.2168C3.5957 15.8197 3.74219 15.4095 4.03516 14.9863C4.33464 14.5566 4.73503 14.1302 5.23633 13.707C5.74414 13.2839 6.33008 12.8672 6.99414 12.457C7.6582 12.0469 8.35807 11.6595 9.09375 11.2949C9.82943 10.9303 10.5781 10.5951 11.3398 10.2891C12.1016 9.97656 12.8307 9.70964 13.5273 9.48828C14.224 9.26693 14.8652 9.0944 15.4512 8.9707C16.0436 8.84049 16.5319 8.77539 16.916 8.77539C17.0267 8.77539 17.1536 8.81771 17.2969 8.90234C17.4466 8.98698 17.5931 9.09766 17.7363 9.23438C17.8861 9.37109 18.0326 9.52409 18.1758 9.69336C18.319 9.86263 18.446 10.0319 18.5566 10.2012C18.6738 10.3704 18.7682 10.5332 18.8398 10.6895C18.9115 10.8392 18.9505 10.9629 18.957 11.0605C18.957 11.0996 18.8887 11.2298 18.752 11.4512C18.6217 11.666 18.4395 11.9525 18.2051 12.3105C17.9707 12.6621 17.694 13.0788 17.375 13.5605C17.056 14.0358 16.7077 14.5566 16.3301 15.123C15.9525 15.6829 15.5521 16.2786 15.1289 16.9102C14.7122 17.5352 14.2891 18.1797 13.8594 18.8438C14.4453 18.707 14.9466 18.5768 15.3633 18.4531C15.7799 18.3229 16.125 18.209 16.3984 18.1113C16.6719 18.0137 16.877 17.9355 17.0137 17.877C17.1504 17.8118 17.2253 17.7793 17.2383 17.7793ZM24.084 21.5977C23.485 22.1836 22.9186 22.6751 22.3848 23.0723C21.8574 23.4694 21.3529 23.7884 20.8711 24.0293C20.3893 24.2702 19.9271 24.4427 19.4844 24.5469C19.0482 24.651 18.6217 24.7031 18.2051 24.7031C18.0293 24.7031 17.834 24.638 17.6191 24.5078C17.4043 24.3776 17.2057 24.2181 17.0234 24.0293C16.8346 23.847 16.6784 23.6549 16.5547 23.4531C16.431 23.2513 16.3691 23.0788 16.3691 22.9355C16.3691 22.4017 16.444 21.9134 16.5938 21.4707C16.737 21.0215 16.929 20.6178 17.1699 20.2598C17.4108 19.9017 17.6842 19.5859 17.9902 19.3125C18.3027 19.0391 18.625 18.8112 18.957 18.6289C19.2956 18.4466 19.6309 18.3099 19.9629 18.2188C20.2949 18.1276 20.6009 18.082 20.8809 18.082C21.0827 18.082 21.2812 18.1406 21.4766 18.2578C21.6784 18.375 21.8607 18.5182 22.0234 18.6875C22.1862 18.8568 22.3164 19.0358 22.4141 19.2246C22.5182 19.4069 22.5703 19.5664 22.5703 19.7031C22.5703 19.9245 22.4759 20.1523 22.2871 20.3867C22.1048 20.6146 21.8444 20.849 21.5059 21.0898C21.1673 21.3307 20.7604 21.5781 20.2852 21.832C19.8099 22.0794 19.2858 22.3301 18.7129 22.584C18.6934 22.7402 18.6836 22.8932 18.6836 23.043C18.6836 23.2448 18.7259 23.3815 18.8105 23.4531C18.9017 23.5247 19.0677 23.5605 19.3086 23.5605C19.7383 23.5605 20.1419 23.4889 20.5195 23.3457C20.9036 23.2025 21.2715 23.0169 21.623 22.7891C21.9746 22.5612 22.3132 22.3008 22.6387 22.0078C22.9642 21.7148 23.2865 21.4186 23.6055 21.1191L24.084 21.5977ZM20.6465 19.1562C20.5163 19.1562 20.373 19.2279 20.2168 19.3711C20.0605 19.5078 19.9043 19.6901 19.748 19.918C19.5918 20.1458 19.4421 20.4095 19.2988 20.709C19.1556 21.002 19.0319 21.3079 18.9277 21.627C19.1686 21.4707 19.403 21.3047 19.6309 21.1289C19.8652 20.9531 20.0736 20.7708 20.2559 20.582C20.4382 20.3867 20.5846 20.1882 20.6953 19.9863C20.806 19.7845 20.8613 19.5827 20.8613 19.3809C20.8613 19.3223 20.8418 19.2702 20.8027 19.2246C20.7702 19.179 20.7181 19.1562 20.6465 19.1562ZM23.4297 21.3047C23.5794 21.1615 23.752 20.9987 23.9473 20.8164C24.1361 20.6341 24.3249 20.4355 24.5137 20.2207C24.709 20.0059 24.888 19.7747 25.0508 19.5273C25.2201 19.2799 25.3535 19.013 25.4512 18.7266C25.4772 18.5768 25.5163 18.4206 25.5684 18.2578C25.627 18.0885 25.6888 17.9355 25.7539 17.7988C25.8255 17.6621 25.8939 17.5482 25.959 17.457C26.0241 17.3659 26.0827 17.3203 26.1348 17.3203C26.2129 17.3659 26.3301 17.4538 26.4863 17.584C26.6426 17.7077 26.7988 17.8411 26.9551 17.9844C27.1113 18.1276 27.248 18.2611 27.3652 18.3848C27.4889 18.502 27.5508 18.5736 27.5508 18.5996C27.4727 18.8991 27.4336 19.1693 27.4336 19.4102C27.4401 19.651 27.4596 19.8887 27.4922 20.123C27.5312 20.3574 27.5703 20.6081 27.6094 20.875C27.6549 21.1354 27.6777 21.4382 27.6777 21.7832C27.6777 21.9915 27.6419 22.2324 27.5703 22.5059C27.5052 22.7728 27.388 23.0137 27.2188 23.2285C27.5508 23.0332 27.8796 22.8151 28.2051 22.5742C28.5306 22.3268 28.8203 22.0957 29.0742 21.8809C29.3737 21.627 29.6602 21.373 29.9336 21.1191L30.373 21.5977C30.1582 21.7995 29.9238 22.0143 29.6699 22.2422C29.4225 22.4701 29.1621 22.6947 28.8887 22.916C28.6217 23.1374 28.3483 23.349 28.0684 23.5508C27.7884 23.7526 27.5117 23.9316 27.2383 24.0879C26.9648 24.2441 26.7012 24.3678 26.4473 24.459C26.1934 24.5501 25.9557 24.5957 25.7344 24.5957C25.5456 24.5957 25.3372 24.5501 25.1094 24.459C24.8815 24.3678 24.6667 24.2572 24.4648 24.127C24.263 23.9967 24.0872 23.86 23.9375 23.7168C23.7878 23.5736 23.6999 23.4531 23.6738 23.3555C23.6738 23.3424 23.6868 23.3164 23.7129 23.2773C23.7389 23.2318 23.7715 23.1862 23.8105 23.1406C23.8431 23.0951 23.8789 23.056 23.918 23.0234C23.9505 22.9844 23.9766 22.9648 23.9961 22.9648C24.0352 22.9648 24.1133 22.9941 24.2305 23.0527C24.3477 23.1113 24.543 23.1406 24.8164 23.1406C24.9661 23.1406 25.0931 23.1016 25.1973 23.0234C25.3079 22.9453 25.3991 22.8411 25.4707 22.7109C25.5423 22.5807 25.5944 22.431 25.627 22.2617C25.6595 22.0924 25.6758 21.9134 25.6758 21.7246C25.6758 21.4512 25.6628 21.1875 25.6367 20.9336C25.6107 20.6732 25.5814 20.4225 25.5488 20.1816C25.4382 20.3118 25.3112 20.4486 25.168 20.5918C25.0247 20.735 24.8783 20.8783 24.7285 21.0215C24.5853 21.1582 24.4388 21.2949 24.2891 21.4316C24.1458 21.5618 24.0156 21.679 23.8984 21.7832L23.4297 21.3047Z" fill="white"/><defs><linearGradient id="paint0_linear_103_12" x1="17" y1="0" x2="17" y2="34" gradientUnits="userSpaceOnUse"><stop stop-color="#325FFF"/><stop offset="1" stop-color="#0D41FC"/></linearGradient></defs></svg>',
		name: "Festrol Corp Ltd.",
		address: "1711 W. El Segundo Blvd, Hawthorne, \n Canada - 90250",
		phone: "Tel: (+11) 245 543 903",
		email: "Mail: hello@festrol.io",
		website: "Web: https://www.festrolcorp.io",
	},
	customer: {
		name: "John Doe",
		address: "1234 Main Street, New York, \n NY 10001",
		phone: "Tel: (555) 555-5555",
		email: "Mail: joe@example.com",
	},
	invoice: {
		number: 1721,
		date: "25/12/2023",
		// deliveryDate: "30/06/2024",
		// dueDate: "25/12/2023",
		status: "Paid!",
		currency: "£",
		path: path.join(__dirname, "invoice.pdf"),
	},
	items: [
		{
			name: "Cloud VPS Server - Starter Plan",
			quantity: 1,
			price: 400,
			tax: 13,
			dscountAmount: 100,
			deliveryFee: 50
		},
		{
			name: "Domain Registration - example.com",
			quantity: 1,
			price: 20,
			tax: 13.5,
			dscountAmount: 100,
			deliveryFee: 50
		},
		{
			name: "Maintenance Charge - Yearly",
			quantity: 1,
			price: 300,
			tax: 0,
			dscountAmount: 100,
			deliveryFee: 50
		},
	],
	qr: {
		data: "https://www.festrolcorp.io",
		width: 50,
	},
	note: "Note: This is a system generated invoice. If you have any questions concerning this invoice, contact us at sales@festrolcorp.io. Thank you for your business!",
};

/* --------------------------------------------------------------------------
	Optional: Config
  -------------------------------------------------------------------------- */
// const config = {
// 	string: {
// 		invoice: "F A C T U A",
// 		refNumber: "Referencia",
// 		date: "Fecha",
// 		dueDate: "Fecha de vencimiento",
// 		status: "επί πληρωμή",	
// 		billTo: "Facturar a",
// 		item: "Artículo",
// 		quantity: "Cantidad",
// 		price: "Precio",
// 		tax: "Impuesto",
// 		total: "Total",
// 		subTotal: "Subtotal",
// 		totalTax: "Total Impuesto",
// 	},
// 	style: {
// 		font: "Noto", // "Helvetica", "Times", "Courier"
// 		fontSize: 10,
// 		lineHeight: 1.2,
// 		color: "#000000",
// 	},
// 	font: {
// 		Noto: {
// 			normal: path.join(__dirname, "fonts/noto/regular.ttf"),
// 			italics: path.join(__dirname, "fonts/noto/italic.ttf"),
// 			bold: path.join(__dirname, "fonts/noto/bold.ttf"),
// 			bolditalics: path.join(__dirname, "fonts/noto/bold-italic.ttf"),
// 		},
// 	},
// };

/**
 * Generate PDF invoice.
 */
const createPDF = async () => {
	try {
		// console.log("payload :",payload);
		const invoice = new PDFInvoice(payload);
		// console.log("invoice :",invoice)
		const result = await invoice.create();
		console.log("✨ [Success] Invoice created : " + result + "\n");
	} catch (err) {
		console.log(err);
	}
};

createPDF();
