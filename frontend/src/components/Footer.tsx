export default function Footer() {
    return (
        <footer className="footer sm:footer-horizontal bg-base-100 text-neutral-content p-10">
            <aside>
                <p>
                    The encryption algorithm used for steganography is secure.
                    <br />
                    Checkout my github.
                    <br/>
                    <a
                        href="https://github.com/kounterSD/Gyza"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline hover:text-blue-300 transition"
                    >
                        github.com/kounterSD/Gyza
                    </a>
                </p>
            </aside>
            <nav>
                <h6 className="footer-title">Social</h6>
                <div className="grid grid-flow-col gap-4">
                    <a
                        href="https://github.com/kounterSD/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            className="fill-current"
                        >
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.207 11.387.6.113.793-.26.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.386-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.238 1.839 1.238 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.305.763-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.51 11.51 0 0 1 3.003-.404c1.018.005 2.043.137 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.48 5.921.432.372.816 1.104.816 2.226v3.293c0 .32.192.694.8.576C20.565 21.796 24 17.3 24 12 24 5.373 18.627 0 12 0z" />
                        </svg>
                    </a>
                </div>
            </nav>
        </footer>
    )
}