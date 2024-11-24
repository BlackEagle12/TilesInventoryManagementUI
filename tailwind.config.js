/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
			neutral: 'var(--bg-neutral)',
			warm: 'var(--bg-warm)',
			modern: 'var(--bg-modern)',
			earthy: 'var(--bg-earthy)',
  			background: `var(--background))`,
  			foreground: 'var(--foreground)',
  			card: {
  				DEFAULT: 'var(--card)',
  				foreground: 'var(--card-foreground)'
  			},
  			popover: {
  				DEFAULT: 'var(--popover)',
  				foreground: 'var(--popover-foreground)'
  			},
  			primary: {
  				DEFAULT: 'var(--primary)',
  				foreground: 'var(--primary-foreground)'
  			},
  			secondary: {
  				DEFAULT: 'var(--secondary)',
  				foreground: 'var(--secondary-foreground)'
  			},
  			muted: {
  				DEFAULT: 'var(--muted)',
  				foreground: 'var(--muted-foreground)'
  			},
  			accent: {
  				DEFAULT: 'var(--accent)',
  				foreground: 'var(--accent-foreground)'
  			},
  			destructive: {
  				DEFAULT: 'var(--destructive)',
  				foreground: 'var(--destructive-foreground)'
  			},
  			border: 'var(--border)',
  			input: 'var(--input)',
  			ring: 'var(--ring)',
  			chart: {
  				'1': 'var(--chart-1)',
  				'2': 'var(--chart-2)',
  				'3': 'var(--chart-3)',
  				'4': 'var(--chart-4)',
  				'5': 'var(--chart-5)'
  			},
  			sidebar: {
  				DEFAULT: 'var(--sidebar-background)',
  				foreground: 'var(--sidebar-foreground)',
  				primary: 'var(--sidebar-primary)',
  				'primary-foreground': 'var(--sidebar-primary-foreground)',
  				accent: 'var(--sidebar-accent)',
  				'accent-foreground': 'var(--sidebar-accent-foreground)',
  				border: 'var(--sidebar-border)',
  				ring: 'var(--sidebar-ring)'
  			}
  		},
		backgroundImage: {
			'gradient-neutral': 'var(--bg-gradient-neutral)',
			'gradient-warm': 'var(--bg-gradient-warm)',
			'gradient-modern': 'var(--bg-gradient-modern)',
			'gradient-earthy': 'var(--bg-gradient-earthy)',
		  },
  	}
  },
  plugins: [require("tailwindcss-animate"),
	plugin(function ({ addBase }) {
		addBase({
		  ':root': {
			'--bg-gradient-neutral': 'linear-gradient(135deg, #f5f5f5, #e0e0e0)',
			'--bg-gradient-warm': 'linear-gradient(135deg, #f7ede2, #f5d1b1)',
			'--bg-gradient-modern': 'linear-gradient(135deg, #333333, #555555)',
			'--bg-gradient-earthy': 'linear-gradient(135deg, #d4b78f, #bfa780)',
			'--bg-neutral': '#f5f5f5',
			'--bg-warm': '#f7ede2',
			'--bg-modern': '#333333',
			'--bg-earthy': '#d4b78f',
		  },
		});
	  }),
  ],
}