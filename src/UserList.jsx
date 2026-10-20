import { useEffect, useState } from 'react'
import axios from 'axios'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

function UserList() {
  const [listOfUsers, setListOfUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedUserId, setExpandedUserId] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchUsers() {
      setLoading(true)
      setError('')

      try {
        const response = await axios.get(USERS_URL, { signal: controller.signal })
        setListOfUsers(response.data)
      } catch (requestError) {
        if (!axios.isCancel(requestError) && !controller.signal.aborted) {
          setError('We couldn’t load the community just now. Please try again.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchUsers()

    return () => controller.abort()
  }, [retryCount])

  const filteredUsers = listOfUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  )

  return (
    <section className="community" id="community" aria-labelledby="community-title">
      <div className="community__heading">
        <div>
          <p className="eyebrow"><span className="eyebrow__line" /> The people behind the place</p>
          <h2 id="community-title">Our community</h2>
        </div>
        {!loading && !error && (
          <p className="community__count">
            <span>{filteredUsers.length.toString().padStart(2, '0')}</span> people
          </p>
        )}
      </div>

      <div className="directory-tools">
        <label className="search-box">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.8" cy="10.8" r="6.8" />
            <path d="m16 16 4.5 4.5" />
          </svg>
          <span className="sr-only">Search people by name</span>
          <input
            type="search"
            placeholder="Find someone by name..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <span className="search-box__shortcut" aria-hidden="true">⌕</span>
        </label>
        <p className="directory-tools__hint">A good hello is always a good place to start.</p>
      </div>

      {loading ? (
        <div className="state-message" role="status">
          <span className="loading-mark" aria-hidden="true" />
          <p>Loading users...</p>
        </div>
      ) : error ? (
        <div className="state-message state-message--error" role="alert">
          <p>{error}</p>
          <button className="retry-button" type="button" onClick={() => setRetryCount((count) => count + 1)}>
            Try again <span aria-hidden="true">↗</span>
          </button>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="state-message">
          <span className="empty-mark" aria-hidden="true">✳</span>
          <p>No one by that name yet.</p>
          <span>Try another search and see who you find.</span>
        </div>
      ) : (
        <div className="user-grid">
          {filteredUsers.map((user, index) => {
            const isExpanded = expandedUserId === user.id
            const initials = user.name
              .split(' ')
              .map((part) => part[0])
              .slice(0, 2)
              .join('')

            return (
              <article className={`user-card${isExpanded ? ' user-card--expanded' : ''}`} key={user.id}>
                <button
                  className="user-card__toggle"
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={`user-details-${user.id}`}
                  onClick={() => setExpandedUserId(isExpanded ? null : user.id)}
                >
                  <span className={`user-avatar user-avatar--${(index % 5) + 1}`} aria-hidden="true">
                    {initials}
                  </span>
                  <span className="user-card__identity">
                    <span className="user-card__name">{user.name}</span>
                    <span className="user-card__email">{user.email}</span>
                  </span>
                  <span className="user-card__arrow" aria-hidden="true">{isExpanded ? '−' : '↗'}</span>
                </button>
                <div className="user-card__company">
                  <span className="user-card__company-label">DOING GOOD AT</span>
                  <span>{user.company.name}</span>
                </div>
                {isExpanded && (
                  <div className="user-details" id={`user-details-${user.id}`}>
                    <div>
                      <span className="user-details__label">ADDRESS</span>
                      <p>{user.address.street}, {user.address.suite}<br />{user.address.city}, {user.address.zipcode}</p>
                    </div>
                    <div>
                      <span className="user-details__label">SAY HELLO</span>
                      <a href={`tel:${user.phone}`}>{user.phone}</a>
                      <a href={`https://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a>
                    </div>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      )}

      {!loading && !error && listOfUsers.length > 0 && (
        <p className="community__closing">
          <span aria-hidden="true">✳</span> Good things grow when we get to know each other.
        </p>
      )}
    </section>
  )
}

export default UserList
