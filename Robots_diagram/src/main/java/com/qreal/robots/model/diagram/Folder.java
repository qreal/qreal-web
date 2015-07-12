package com.qreal.robots.model.diagram;

import com.qreal.robots.model.auth.User;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

/**
 * Created by korniluk13 on 09.07.2015.
 */

@Entity
@Table(name = "folders")
public class Folder implements Serializable{

    public Folder() {}

    public Folder(String folderName, User creator, String folderParent) {
        this.folderName = folderName;
        this.creator = creator;
        this.folderParent = folderParent;
    }

    @Id
    @Column(name = "folder_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long folderId;

    @Column(name = "folder_name")
    private String folderName;

    @Column(name = "folder_parent")
    private String folderParent;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "username", nullable = false)
    private User creator;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "folder_id", referencedColumnName = "folder_id")
    private Set<Diagram> diagrams;

    public void setFolderId(Long folderId) { this.folderId = folderId; }

    public Long getFolderId() { return this.folderId; }

    public void setFolderName(String name) { this.folderName = name; }

    public String getFolderName() { return this.folderName; }

    public void setFolderParent(String folderParent) { this.folderParent = folderParent; }

    public String getFolderParent() { return this.folderParent; }

    public void setCreator(User creator) { this.creator = creator; }

    public User getCreator() { return this.creator; }

    public Set<Diagram> getDiagrams() { return this.diagrams; }

    public void setDiagrams(Set<Diagram> diagrams) { this.diagrams = diagrams; }
}
