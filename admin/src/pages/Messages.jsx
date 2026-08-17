import { useEffect, useState } from "react";

import { apiRequest } from "../services/api";

const Messages = () => {
  // =========================
  // STATE
  // =========================

  const [messages, setMessages] = useState([]);

  const [selected, setSelected] = useState(null);

  const [loading, setLoading] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
    totalMessages: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  // Search
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  // =========================
  // LOAD MESSAGES
  // =========================

  const loadMessages = async () => {
    try {
      setLoading(true);

      const data = await apiRequest(
        `/messages?page=${page}&limit=${limit}&search=${encodeURIComponent(
          search
        )}`
      );

      setMessages(data.data || []);

      setPagination(
        data.pagination || {
          currentPage: page,
          limit,
          totalMessages: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        }
      );
    } catch (error) {
      console.error(
        "Failed to load messages:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH WHEN PAGE/LIMIT/SEARCH CHANGES
  // =========================

  useEffect(() => {
    loadMessages();
  }, [page, limit, search]);

  // =========================
  // SEARCH
  // =========================

  const handleSearch = (e) => {
    e.preventDefault();

    setPage(1);
    setSearch(searchInput.trim());
  };

  // =========================
  // CLEAR SEARCH
  // =========================

  const handleClearSearch = () => {
    setSearchInput("");
    setSearch("");
    setPage(1);
  };

  // =========================
  // LIMIT CHANGE
  // =========================

  const handleLimitChange = (e) => {
    const newLimit = Number(e.target.value);

    setLimit(newLimit);
    setPage(1);
  };

  // =========================
  // PAGE CHANGE
  // =========================

  const handlePageChange = (newPage) => {
    if (newPage < 1) return;

    if (
      pagination.totalPages > 0 &&
      newPage > pagination.totalPages
    ) {
      return;
    }

    setPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE MESSAGE
  // =========================

  const deleteMessage = async (id) => {
    const confirmed = window.confirm(
      "Delete this message?"
    );

    if (!confirmed) return;

    try {
      await apiRequest(`/messages/${id}`, {
        method: "DELETE",
      });

      // Remove from current list
      setMessages((prev) =>
        prev.filter(
          (message) => message._id !== id
        )
      );

      // Close modal if deleted message was selected
      if (selected?._id === id) {
        setSelected(null);
      }

      // Update total
      setPagination((prev) => ({
        ...prev,
        totalMessages: Math.max(
          prev.totalMessages - 1,
          0
        ),
      }));

      /*
       * If the current page becomes empty,
       * move to previous page.
       */
      if (
        messages.length === 1 &&
        page > 1
      ) {
        setPage((prev) => prev - 1);
      } else {
        // Reload current page
        loadMessages();
      }
    } catch (error) {
      console.error(
        "Delete message error:",
        error
      );

      alert(
        error.message ||
          "Failed to delete message"
      );
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
  return (
    <div className="admin-loading">
      <div className="admin-loader-ring">
        <div className="admin-loader-inner"></div>
      </div>

      <div className="admin-loader-text">
        <span>LOADING MESSAGES</span>
        <span className="admin-loader-dots">...</span>
      </div>
    </div>
  );
}

  // =========================
  // RENDER
  // =========================

  return (
    <div>

      {/* =========================
          HEADER
      ========================= */}

      <div className="page-header">

        <div>
          <h1>Messages</h1>

          <p>
            Messages received from your portfolio.
          </p>
        </div>

        {/* =========================
            SEARCH
        ========================= */}

        <form
          className="message-search"
          onSubmit={handleSearch}
        >

          <input
            type="text"
            placeholder="Search by name..."
            value={searchInput}
            onChange={(e) =>
              setSearchInput(e.target.value)
            }
          />

          <button type="submit">
            Search
          </button>

          {search && (
            <button
              type="button"
              className="search-clear"
              onClick={handleClearSearch}
            >
              Clear
            </button>
          )}

        </form>

        {/* =========================
          SEARCH RESULT INFO
      ========================= */}

      {search && (
        <div className="search-result-info">
          Searching messages for:{" "}
          <strong>"{search}"</strong>
        </div>
      )}

      </div>

      

      {/* =========================
          TABLE
      ========================= */}

      <div className="table-container">

        <table>

          <thead>
            <tr>
              <th>Name</th>

              <th>Email</th>

              <th>Subject</th>

              <th>Date</th>

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {messages.map((message) => (

              <tr key={message._id}>

                {/* NAME */}

                <td>
                  {message.name}
                </td>

                {/* EMAIL */}

                <td>
                  {message.email}
                </td>

                {/* SUBJECT */}

                <td>
                  {message.subject}
                </td>

                {/* DATE */}

                <td>
                  {new Date(
                    message.createdAt
                  ).toLocaleDateString()}
                </td>

                {/* ACTIONS */}

                <td>

                  <div className="actions">

                    <button
                      onClick={() =>
                        setSelected(message)
                      }
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        deleteMessage(
                          message._id
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {/* =========================
            EMPTY STATE
        ========================= */}

        {messages.length === 0 && (
          <div className="empty-state">

            {search
              ? `No messages found for "${search}".`
              : "No messages found."}

          </div>
        )}

      </div>

      {/* =========================
          PAGINATION
      ========================= */}

      {pagination.totalMessages > 0 && (

        <div className="pagination-container">

          {/* =========================
              PAGINATION INFO
          ========================= */}

          <div className="pagination-info">

            Showing{" "}

            <strong>
              {(page - 1) * limit + 1}
            </strong>

            {" - "}

            <strong>
              {Math.min(
                page * limit,
                pagination.totalMessages
              )}
            </strong>

            {" of "}

            <strong>
              {pagination.totalMessages}
            </strong>

            {" messages"}

          </div>

          {/* =========================
              LIMIT
          ========================= */}

          <div className="pagination-limit">

            <label htmlFor="message-limit">
              Show:
            </label>

            <select
              id="message-limit"
              value={limit}
              onChange={handleLimitChange}
            >

              <option value="5">
                5
              </option>

              <option value="10">
                10
              </option>

              <option value="20">
                20
              </option>

              <option value="50">
                50
              </option>

            </select>

          </div>

          {/* =========================
              PAGE CONTROLS
          ========================= */}

          <div className="pagination-controls">

            {/* PREVIOUS */}

            <button
              disabled={
                !pagination.hasPreviousPage
              }
              onClick={() =>
                handlePageChange(page - 1)
              }
            >
              Previous
            </button>

            {/* PAGE NUMBERS */}

            {Array.from(
              {
                length:
                  pagination.totalPages,
              },
              (_, index) => index + 1
            ).map((pageNumber) => (

              <button
                key={pageNumber}
                className={
                  page === pageNumber
                    ? "active"
                    : ""
                }
                onClick={() =>
                  handlePageChange(
                    pageNumber
                  )
                }
              >
                {pageNumber}
              </button>

            ))}

            {/* NEXT */}

            <button
              disabled={
                !pagination.hasNextPage
              }
              onClick={() =>
                handlePageChange(page + 1)
              }
            >
              Next
            </button>

          </div>

        </div>

      )}

      {/* =========================
          MESSAGE MODAL
      ========================= */}

      {selected && (

        <div
          className="modal-overlay"
          onClick={() =>
            setSelected(null)
          }
        >

          <div
            className="message-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="modal-header">

              <h2>
                Message
              </h2>

              <button
                onClick={() =>
                  setSelected(null)
                }
              >
                ×
              </button>

            </div>

            {/* MESSAGE DETAILS */}

            <div className="message-details">

              <div>

                <span>
                  Name
                </span>

                <strong>
                  {selected.name}
                </strong>

              </div>

              <div>

                <span>
                  Email
                </span>

                <strong>
                  {selected.email}
                </strong>

              </div>

              <div>

                <span>
                  Subject
                </span>

                <strong>
                  {selected.subject}
                </strong>

              </div>

              <div>

                <span>
                  Message
                </span>

                <p>
                  {selected.message}
                </p>

              </div>

            </div>

            {/* CLOSE */}

            <button
              className="primary-button full-button"
              onClick={() =>
                setSelected(null)
              }
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default Messages;