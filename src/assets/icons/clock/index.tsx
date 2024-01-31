export const Clock = () => (
  <span className="w-6 h-6 lg:w-7 lg:h-7">
    <svg
      className="w-full h-full"
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.75 11.312C19.5907 13.1645 18.9056 14.9329 17.7753 16.4092C16.645 17.8856 15.1166 19.0084 13.3699 19.6456C11.6232 20.2828 9.73081 20.4079 7.91543 20.0061C6.10004 19.6043 4.43715 18.6924 3.12242 17.3777C1.80768 16.063 0.89579 14.4001 0.494024 12.5847C0.0922574 10.7693 0.217332 8.87692 0.854532 7.1302C1.49173 5.38348 2.61455 3.85508 4.09088 2.72482C5.56722 1.59455 7.33565 0.90945 9.18813 0.750107C9.28662 0.741981 9.38575 0.753334 9.47985 0.783518C9.57395 0.813702 9.66119 0.862126 9.73658 0.926024C9.81197 0.989923 9.87404 1.06804 9.91923 1.15593C9.96443 1.24381 9.99188 1.33974 10 1.43823C10.0081 1.53672 9.99677 1.63585 9.96659 1.72995C9.93641 1.82406 9.88798 1.91129 9.82409 1.98668C9.76019 2.06207 9.68207 2.12414 9.59418 2.16934C9.5063 2.21454 9.41037 2.24198 9.31188 2.25011C7.74399 2.38482 6.24719 2.96455 4.99761 3.92107C3.74802 4.8776 2.79762 6.17113 2.25824 7.64947C1.71887 9.12782 1.61295 10.7295 1.95296 12.266C2.29296 13.8024 3.06474 15.2099 4.17749 16.3226C5.29024 17.4354 6.69766 18.2071 8.23416 18.5472C9.77065 18.8872 11.3723 18.7812 12.8506 18.2419C14.329 17.7025 15.6225 16.7521 16.579 15.5025C17.5356 14.2529 18.1153 12.7561 18.25 11.1882C18.2664 10.9893 18.3612 10.8051 18.5134 10.676C18.6657 10.547 18.863 10.4837 19.0619 10.5001C19.2608 10.5165 19.445 10.6113 19.5741 10.7635C19.7031 10.9158 19.7664 11.1131 19.75 11.312ZM9.25 5.25011V10.5001C9.25 10.699 9.32902 10.8898 9.46967 11.0304C9.61032 11.1711 9.80109 11.2501 10 11.2501H15.25C15.4489 11.2501 15.6397 11.1711 15.7803 11.0304C15.921 10.8898 16 10.699 16 10.5001C16 10.3012 15.921 10.1104 15.7803 9.96978C15.6397 9.82912 15.4489 9.75011 15.25 9.75011H10.75V5.25011C10.75 5.05119 10.671 4.86043 10.5303 4.71978C10.3897 4.57912 10.1989 4.50011 10 4.50011C9.80109 4.50011 9.61032 4.57912 9.46967 4.71978C9.32902 4.86043 9.25 5.05119 9.25 5.25011ZM13 3.00011C13.2225 3.00011 13.44 2.93413 13.625 2.81051C13.81 2.68689 13.9542 2.51119 14.0394 2.30563C14.1245 2.10006 14.1468 1.87386 14.1034 1.65563C14.06 1.4374 13.9528 1.23695 13.7955 1.07961C13.6382 0.922277 13.4377 0.815132 13.2195 0.771723C13.0013 0.728315 12.7751 0.750594 12.5695 0.835742C12.3639 0.920891 12.1882 1.06508 12.0646 1.25009C11.941 1.4351 11.875 1.6526 11.875 1.87511C11.875 2.17348 11.9935 2.45962 12.2045 2.6706C12.4155 2.88158 12.7016 3.00011 13 3.00011ZM16.375 5.25011C16.5975 5.25011 16.815 5.18413 17 5.06051C17.185 4.93689 17.3292 4.76119 17.4144 4.55563C17.4995 4.35006 17.5218 4.12386 17.4784 3.90563C17.435 3.6874 17.3278 3.48695 17.1705 3.32961C17.0132 3.17228 16.8127 3.06513 16.5945 3.02172C16.3763 2.97831 16.1501 3.00059 15.9445 3.08574C15.7389 3.17089 15.5632 3.31508 15.4396 3.50009C15.316 3.6851 15.25 3.9026 15.25 4.12511C15.25 4.42348 15.3685 4.70962 15.5795 4.9206C15.7905 5.13158 16.0766 5.25011 16.375 5.25011ZM18.625 8.62511C18.8475 8.62511 19.065 8.55913 19.25 8.43551C19.435 8.31189 19.5792 8.13619 19.6644 7.93062C19.7495 7.72506 19.7718 7.49886 19.7284 7.28063C19.685 7.0624 19.5778 6.86195 19.4205 6.70461C19.2632 6.54728 19.0627 6.44013 18.8445 6.39672C18.6263 6.35331 18.4001 6.37559 18.1945 6.46074C17.9889 6.54589 17.8132 6.69008 17.6896 6.87509C17.566 7.0601 17.5 7.2776 17.5 7.50011C17.5 7.79847 17.6185 8.08462 17.8295 8.2956C18.0405 8.50658 18.3266 8.62511 18.625 8.62511Z"
        fill="white"
      />
    </svg>
  </span>
);